import {
  defaultFor,
  defaultSlots,
} from "akasha/agents/seats/modules/resolve/seat-resolve.module.code.ts"

export function defaultLines(root: string): readonly string[] {
  return defaultSlots(root).flatMap((slot) => {
    const slug = defaultFor(slot, root)
    return slug === null ? [] : [`${slot}=${slug}`]
  })
}
