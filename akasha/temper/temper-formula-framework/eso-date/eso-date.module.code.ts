import { getEsoDayStr } from "@akasha/day/eso-day"

export function getEsoDateString(): string {
  return getEsoDayStr(new Date())
}
