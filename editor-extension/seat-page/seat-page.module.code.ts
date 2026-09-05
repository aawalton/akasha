import { akashaSeatsThatExist } from "@akasha/seat-system/seat-akasha-beside"

export async function seatNamesThatExist(): Promise<ReadonlySet<string>> {
  return new Set(akashaSeatsThatExist().values())
}
