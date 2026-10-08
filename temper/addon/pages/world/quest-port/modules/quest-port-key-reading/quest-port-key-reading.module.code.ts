import { luaArrayOrEmpty } from "akasha/temper/eso/saved-variable/modules/lua-array/lua-array.module.code.ts"
import { z } from "zod"

const KEY_BINDING = z.object({
  layer: z.string(),
  category: z.string(),
  action: z.string(),
  bindingIndex: z.number(),
  keyCode: z.number(),
  mod1: z.number(),
  mod2: z.number(),
  mod3: z.number(),
  mod4: z.number(),
})

const LAYER_ACTION = z.object({ layer: z.string(), action: z.string() })

export const KEY_OWNERS = z.object({
  at: z.number(),
  character: z.string(),
  occasion: z.string(),
  scene: z.string().optional(),
  baseScene: z.boolean().optional(),
  activeLayers: luaArrayOrEmpty(z.string()).optional(),
  actionsOnKey: luaArrayOrEmpty(LAYER_ACTION).optional(),
  onKey: luaArrayOrEmpty(KEY_BINDING).optional(),
  cycleBindings: luaArrayOrEmpty(KEY_BINDING).optional(),
})

export type KeyOwnersReading = z.infer<typeof KEY_OWNERS>

function bindingLine(binding: z.infer<typeof KEY_BINDING>): string {
  const mods = [binding.mod1, binding.mod2, binding.mod3, binding.mod4].filter((mod) => mod !== 0)
  return (
    `      ${binding.layer} / ${binding.category} / ${binding.action} #${String(binding.bindingIndex)}` +
    ` key=${String(binding.keyCode)} mods=${mods.length === 0 ? "none" : mods.join("+")}`
  )
}

export function keyOwnerLines(owners: KeyOwnersReading): readonly string[] {
  const lines = [
    `t=${String(owners.at)} ${owners.occasion} by ${owners.character}: scene "${owners.scene ?? "-"}"` +
      ` base=${String(owners.baseScene ?? "-")}`,
  ]
  lines.push(
    owners.activeLayers === undefined
      ? "    active layers: not read"
      : `    active layers: ${owners.activeLayers.join(", ")}`
  )
  if (owners.actionsOnKey === undefined) lines.push("    T reaches: not read")
  else if (owners.actionsOnKey.length === 0) lines.push("    T reaches: nothing in an active layer")
  else {
    const reached = owners.actionsOnKey.map((one) => `${one.layer} -> ${one.action}`)
    lines.push(`    T reaches: ${reached.join("; ")}`)
  }
  if (owners.onKey === undefined) lines.push("    bound to T: not read")
  else {
    lines.push(`    bound to T (${String(owners.onKey.length)}):`)
    lines.push(...owners.onKey.map(bindingLine))
  }
  if (owners.cycleBindings === undefined) lines.push("    next-quest keys: not read")
  else if (owners.cycleBindings.length === 0) lines.push("    next-quest keys: none")
  else {
    lines.push(`    next-quest keys (${String(owners.cycleBindings.length)}):`)
    lines.push(...owners.cycleBindings.map(bindingLine))
  }
  return lines
}
