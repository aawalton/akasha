export type Landing = {
  readonly relPath: string
  readonly body: string
}

export type Landed = {
  readonly wrote: readonly string[]
  readonly gone: readonly string[]
  readonly sha: string | null
}

export type Asked = {
  readonly repo: string
  readonly root: string
  readonly message: string
  readonly entries: readonly Landing[]
  readonly removing: readonly string[]
}

export type Answer = Landed | { readonly refused: string }

export type Lands = (asked: Asked) => Answer

const UNSTATED =
  "nothing here says how a page lands: an app states its landing once at boot, and this one wrote before it did"

let landing: Lands | null = null

export const useLanding = (lands: Lands): void => {
  landing = lands
}

export const landingHere = (): Lands | null => landing

export const landsBy = (asked: Asked): Answer =>
  landing === null ? { refused: UNSTATED } : landing(asked)
