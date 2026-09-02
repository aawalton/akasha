export type LangOptions = {
  showbutton: string
  lockbutton: string
  lockelements: string
  closeonmove: string
  useartisan: string
  useflask: string
  usequest: string
  usequestTooltip?: string
  usecook: string
  usecookTooltip?: string
  userune: string
  useruneTooltip?: string
  displaystyles: string
  markitems: string
  showsymbols: string
  marksetitems: string
  showstock: string
  stacksplit: string
  markduplicates: string
  displayrunelevel: string
  displaymm: string
  displayttc: string
  timeralarm: string
  mountalarm: string
  researchalarm: string
  playrunevoice: string
  advancedcolorgrid: string
  lockprotection: string
  inspirationgain: string
  sortsets: string
  sortstyles: string
  bulkcraftlimit: string
  overviewstyle: string
  userunecreation: string
  userunecreationTooltip?: string
  useruneextraction: string
  useruneextractionTooltip?: string
  userunerecipe: string
  userunerecipeTooltip?: string
  displayunknown: string
  displayknown: string
  displaycount: string
}

export type LangSuboptions = {
  sortstyles: string[]
  sortsets: string[]
  alarms: string[]
  overviewstyle: string[]
}

export type TtTable = [
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string[],
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string,
]

export type LangTable = {
  options: LangOptions
  suboptions: LangSuboptions
  TT: TtTable
  alternativeResourceNames?: Record<number, Record<number, string>>
  nobagspace: string
  noItemPreview: string
  noFurnitureData: string
  noSlot: string
  blueprintSearchLimit: string
  removeCurrentCharacter?: string
  searchfor: string
  finished: string
  level: string
  rank: string
  bank: string
  housebank: string
  guildbank: string
  craftbag: string
  chars: string
  set: string
  unknown: string
  knownStyles: string
  unknownStyles: string
  finishResearch: string
  finishMount: string
  finish12: string
  finish24: string
  itemsearch: string
  hideStyles: string
  hideCrownStyles: string
  hideKnown: string
  hideUnknown: string
  unselectedWayshrine: string
  unknownWayshrine: string
  previewType: [string, string, string, string]
  provisioningWritOffset?: number
  styleNames: Record<string, string>
  reload: string
}
