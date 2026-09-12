import type { Piping } from "akasha/commands/modules/piping/piping.module.code.ts"

export const TERMINAL: Piping = () => ({ tty: true })

export function piping(said: string): Piping {
  return () => ({ bytes: new TextEncoder().encode(said) })
}
