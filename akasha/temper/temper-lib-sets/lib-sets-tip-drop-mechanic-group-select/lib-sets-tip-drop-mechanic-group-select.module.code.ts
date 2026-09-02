export interface ZoneGroupMember {
  index: number
  name: string | undefined
  nameClean: string | undefined
  locationName: string | undefined
}

export interface ZoneGroupEntry {
  name: string | undefined
  nameClean: string | undefined
  locationName: string | undefined
}

const KEY_FIELD_SEPARATOR = "\u0001"

export function selectZoneGroupEntries(this: void, members: ZoneGroupMember[]): ZoneGroupEntry[] {
  const orderedMembers: ZoneGroupMember[] = []
  for (const groupMember of members) {
    orderedMembers.push(groupMember)
  }
  orderedMembers.sort((a, b) => a.index - b.index)

  const claimsAlreadyMade: { [claimKey: string]: boolean } = {}
  const entries: ZoneGroupEntry[] = []
  for (const groupMember of orderedMembers) {
    const hasName = groupMember.name !== undefined && groupMember.name !== ""
    const hasLocation = groupMember.locationName !== undefined && groupMember.locationName !== ""
    if (!hasName && !hasLocation) {
      continue
    }

    const claimKey =
      (groupMember.name ?? "") + KEY_FIELD_SEPARATOR + (groupMember.locationName ?? "")
    if (claimsAlreadyMade[claimKey]) {
      continue
    }
    claimsAlreadyMade[claimKey] = true

    entries.push({
      name: hasName ? groupMember.name : undefined,
      nameClean: hasName ? groupMember.nameClean : undefined,
      locationName: groupMember.locationName,
    })
  }
  return entries
}
