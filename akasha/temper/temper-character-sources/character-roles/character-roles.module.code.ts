import { createDataFile } from "@akasha/utils-narrow/create-data-file"

export interface RoleTemplate {
  id: string
  name: string
}

const ROLE_DATA = {
  "no-role": { id: "no-role" as const, name: "No Role" },
  "dps": { id: "dps" as const, name: "DPS" },
  "tank": { id: "tank" as const, name: "Tank" },
  "healer": { id: "healer" as const, name: "Healer" },
  "pvp": { id: "pvp" as const, name: "PvP" },
  "solo": { id: "solo" as const, name: "Solo" },
} satisfies Record<string, RoleTemplate>

export const characterRoles = createDataFile<RoleTemplate>()(ROLE_DATA)

export type RoleId = (typeof characterRoles.ids)[number]

export function getRoleName(roleIds: readonly RoleId[]): string {
  const filtered = roleIds.filter((id) => id !== "no-role")
  if (filtered.length === 0) return "No Role"
  return filtered.map((id) => characterRoles.data[id].name).join(" + ")
}
