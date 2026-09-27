import {
  createPagesStore,
  type PagesStore,
} from "akasha/page/ui-store/collection/modules/store/store.module.code.ts"

const CARRIED: Readonly<Record<string, readonly string[]>> = {
  "temper-task": ["progress"],
  "temper-set": ["bonuses", "icons"],
  "temper-companion-skill": ["skillEffects", "castConditions"],
  "temper-recipe-list": ["recipes"],
  "temper-skill": ["effects"],
  "temper-grimoire": ["signatureScripts", "affixScripts"],
  "temper-rule-template": ["conditions"],
  "temper-buff-major": ["effects"],
  "temper-buff-minor": ["effects"],
  "temper-buff-other": ["effects"],
  "temper-debuff-major": ["effects"],
  "temper-debuff-minor": ["effects"],
  "temper-debuff-other": ["effects"],
  "temper-vampire-stage": ["effects"],
  "temper-potion-crown": ["effects"],
  "temper-potion-dropped": ["effects"],
  "temper-potion-crafted": ["effects"],
  "temper-eso-companion": ["companionQuests"],
  "temper-armor-trait": ["effects"],
  "temper-weapon-trait": ["effects"],
  "temper-jewelry-trait": ["effects"],
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
