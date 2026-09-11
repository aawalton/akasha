import { optionalEnv } from "akasha/utils/narrow/require-env/require-env.module.code.ts"

export function checkoutAt(): string {
  return optionalEnv("AKASHA_ROOT") ?? process.cwd()
}
