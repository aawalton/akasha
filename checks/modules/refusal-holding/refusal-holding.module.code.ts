import { counted } from "akasha/utils/text/modules/counted/counted.module.code.ts"

export function heldTo(said: readonly string[], ceiling: number): readonly string[] {
  const held: string[] = []
  let bytes = 0
  for (const one of said) {
    bytes += new TextEncoder().encode(one).length + 1
    if (bytes > ceiling) {
      held.push(
        `${counted(said.length, "refusal")} in all, and the ${held.length} above are what one ` +
          `answer holds at ${ceiling} bytes — begin with those`
      )
      return held
    }
    held.push(one)
  }
  return held
}

export function reasonSaid(reason: string, ceiling: number): string {
  const said = reason
    .split("\n")
    .map((one) => one.replace(/\s+/g, " ").trim())
    .filter((one) => one !== "")
  const kept: string[] = []
  let held = 0
  for (const one of said) {
    if (kept.length > 0 && held + one.length + 1 > ceiling) break
    kept.push(one)
    held += one.length + 1
  }
  const whole = kept.join(" ")
  const over = whole.length - ceiling
  const more: string[] = []
  if (over > 0) more.push(counted(over, "character"))
  if (said.length > kept.length) more.push(counted(said.length - kept.length, "line"))
  const shown = over > 0 ? `${whole.slice(0, ceiling)}...` : whole
  return more.length === 0 ? shown : `${shown} (${more.join(" and ")} more)`
}
