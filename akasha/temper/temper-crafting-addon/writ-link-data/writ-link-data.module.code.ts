import { LINK } from "../writ-link-data-table/writ-link-data-table.module.code.ts"

export function toLinkKey(name: string): string {
  const [s1] = string.gsub(name, "%^.*", "")
  const [s2] = string.gsub(s1, "|.*", "")
  return string.lower(s2)
}

export function findLink(matName: string): string | undefined {
  const key = toLinkKey(matName)
  return LINK[key]
}

TemperWrit.LINK = LINK
TemperWrit.FindLink = findLink
TemperWrit.ToLinkKey = toLinkKey
