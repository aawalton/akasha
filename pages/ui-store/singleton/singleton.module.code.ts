import type { ContentPagePersistencePort } from "../collection/content-persistence/content-persistence.module.code.ts"
import type { FetchImpl } from "../collection/fetch-attach/fetch-attach.module.code.ts"
import type { PagesPersistencePort } from "../collection/persistence/persistence.module.code.ts"
import { createPagesStore, type PagesStore } from "../collection/store/store.module.code.ts"
import { emitStoreDiagnostic } from "../diagnostics/diagnostics.module.code.ts"

const HYDRATE_GATE_TIMEOUT_MS = 3_000

function boundBootGate(gate: Promise<void>, timeoutMs: number, gateName: string): Promise<void> {
  let timer: ReturnType<typeof setTimeout> | null = null
  const bound = new Promise<void>((resolve) => {
    timer = setTimeout(() => {
      timer = null
      emitStoreDiagnostic({
        reason: "boot-gate-timeout",
        message: `[pages-ui-store] boot gate '${gateName}' overran ${timeoutMs}ms — proceeding to unstick the boot`,
        detail: `gate=${gateName} elapsed>=${timeoutMs}ms; the underlying await keeps running and hydrates late if it resolves`,
      })
      resolve()
    }, timeoutMs)
  })
  return Promise.race([
    gate.then(() => {
      if (timer !== null) clearTimeout(timer)
    }),
    bound,
  ])
}

let storePromise: Promise<PagesStore> | null = null

let persistencePort: PagesPersistencePort | null = null

let contentPersistencePort: ContentPagePersistencePort | null = null

let fileBackingFetch: FetchImpl | null = null

let envReadyResolve: (() => undefined) | null = null
const envReadyPromise: Promise<void> = new Promise((resolve) => {
  envReadyResolve = () => {
    resolve()
    return undefined
  }
})

export function getPagesStore(): Promise<PagesStore> {
  if (storePromise === null) {
    storePromise = Promise.resolve(
      createPagesStore(
        persistencePort,
        250,
        () => {
          contentPersistencePort?.clear()
        },
        fileBackingFetch === null ? {} : { fetchImpl: fileBackingFetch }
      )
    )
  }
  return storePromise
}

export function configurePagesPersistence(port: PagesPersistencePort | null): undefined {
  persistencePort = port
  if (storePromise !== null && port !== null) {
    console.warn(
      "[pages-ui-store] configurePagesPersistence called after store creation — boot hydration was skipped"
    )
  }
}

export async function awaitPagesStoreReady(): Promise<PagesStore> {
  await envReadyPromise
  const store = await getPagesStore()
  await boundBootGate(store.whenHydrated, HYDRATE_GATE_TIMEOUT_MS, "hydrate")
  return store
}

export function configurePagesStoreFetch(fetchImpl: FetchImpl | null): undefined {
  fileBackingFetch = fetchImpl
  if (storePromise !== null && fetchImpl !== null) {
    console.warn(
      "[pages-ui-store] configurePagesStoreFetch called after store creation — the roster and every file-backed page type are being read over the default fetch"
    )
  }
}

export function configureContentPersistence(port: ContentPagePersistencePort | null): undefined {
  contentPersistencePort = port
}

export function getContentPersistence(): ContentPagePersistencePort | null {
  return contentPersistencePort
}

export interface ConfigurePagesStoreAuthArgs {
  readonly supabaseUrl: string
  readonly supabaseAnonKey: string
  readonly jwt: string | null
  readonly refreshAuth?: () => undefined | Promise<void>
}

export function configurePagesStoreAuth(args: ConfigurePagesStoreAuthArgs): Promise<void> {
  return getPagesStore().then((store) => {
    store.setAuth({ jwt: args.jwt, refreshAuth: args.refreshAuth })
    if (envReadyResolve !== null) {
      envReadyResolve()
      envReadyResolve = null
    }
  })
}
