const HERE_TO_THERE: ReadonlyMap<string, string> = new Map([
  ["passed", "completed"],
  ["answered-elsewhere", "resolved"],
  ["overtaken", "superseded"],
])

const THERE_TO_HERE: ReadonlyMap<string, string> = new Map([
  ["completed", "passed"],
  ["resolved", "answered-elsewhere"],
  ["superseded", "overtaken"],
])

export function statusAsCodeRepoSpells(status: string): string {
  return HERE_TO_THERE.get(status) ?? status
}

export function statusAsPagesSpell(status: string): string {
  return THERE_TO_HERE.get(status) ?? status
}
