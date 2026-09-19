import type { Piping } from "akasha/command/modules/piping/piping.module.code.ts"

export const terminal: Piping = () => ({ tty: true })

export function piping(said: string): Piping {
  return () => ({ bytes: new TextEncoder().encode(said) })
}
