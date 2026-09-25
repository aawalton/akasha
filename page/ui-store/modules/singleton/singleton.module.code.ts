import {
  createPagesStore,
  type PagesStore,
} from "akasha/page/ui-store/collection/modules/store/store.module.code.ts"

const CARRIED: Readonly<Record<string, readonly string[]>> = {
  "temper-task": ["progress"],
}

let storePromise: Promise<PagesStore> | null = null

let envReadyResolve: (() => undefined) | null = null
const envReadyPromise: Promise<void> = new Promise((resolve) => {
  envReadyResolve = () => {
    resolve()
    return undefined
  }
})

export function getPagesStore(): Promise<PagesStore> {
  if (storePromise === null) {
    storePromise = Promise.resolve(createPagesStore({ carry: CARRIED }))
  }
  return storePromise
}

export async function awaitPagesStoreReady(): Promise<PagesStore> {
  await envReadyPromise
  return getPagesStore()
}

export async function readPagesAgain(pageTypeSlug: string): Promise<void> {
  const store = await getPagesStore()
  await store.readSlugAgain(pageTypeSlug)
}

export interface ConfigurePagesStoreAuthArgs {
  readonly jwt: string | null
  readonly owner?: string | null
  readonly refreshAuth?: () => undefined | Promise<void>
}

export function configurePagesStoreAuth(args: ConfigurePagesStoreAuthArgs): Promise<void> {
  return getPagesStore().then((store) => {
    store.setAuth({
      jwt: args.jwt,
      ...(args.owner === undefined ? {} : { owner: args.owner }),
      refreshAuth: args.refreshAuth,
    })
    if (envReadyResolve !== null) {
      envReadyResolve()
      envReadyResolve = null
    }
  })
}
