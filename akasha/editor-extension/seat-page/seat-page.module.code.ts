import { akashaSeatsThatExist } from "@tools/lib/seat-akasha-beside"

export async function agentIdsForSeatNames(
  names: readonly string[]
): Promise<ReadonlyMap<string, string>> {
  const wanted = new Set(names)
  const found = new Map<string, string>()
  for (const [id, name] of akashaSeatsThatExist()) {
    if (wanted.has(name)) {
      found.set(name, id)
    }
  }
  return found
}

export async function seatNamesThatExist(): Promise<ReadonlySet<string>> {
  return new Set(akashaSeatsThatExist().values())
}
