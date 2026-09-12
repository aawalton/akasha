import { PUT_BACK } from "akasha/commands/modules/change-freshness/change-freshness.module.code.ts"
import { LOCK_AT } from "akasha/git/holding/holding.module.code.ts"

export type Went = { readonly went: true } | { readonly why: string }

export const TRIES = 5

export const WAIT_MS = 30_000

export const THROWN = "the landing ended in an error rather than a reason"

export function reasonThrown(thrown: unknown): string {
  return `${THROWN}: ${thrown instanceof Error ? thrown.message : String(thrown)}`
}

export function worthAnotherTry(why: string): boolean {
  return why.includes(LOCK_AT) || why.includes(PUT_BACK)
}

export async function sleeping(ms: number): Promise<void> {
  await Bun.sleep(ms)
}

async function asked(ask: () => Promise<Went>): Promise<Went> {
  try {
    return await ask()
  } catch (thrown) {
    return { why: reasonThrown(thrown) }
  }
}

export async function landingAgain(
  ask: () => Promise<Went>,
  waited: (ms: number) => Promise<void> = sleeping
): Promise<Went> {
  let went = await asked(ask)
  for (let tried = 1; tried < TRIES && "why" in went && worthAnotherTry(went.why); tried += 1) {
    await waited(WAIT_MS)
    went = await asked(ask)
  }
  return went
}
