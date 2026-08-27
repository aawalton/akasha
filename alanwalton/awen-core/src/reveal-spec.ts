import { DEFAULT_REVEAL_KEYS } from "./revealed"

export function resolveRevealKeys(declared: readonly string[] | undefined): readonly string[] {
  return declared ?? DEFAULT_REVEAL_KEYS
}
