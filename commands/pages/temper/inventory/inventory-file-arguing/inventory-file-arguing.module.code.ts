const INVENTORY_PATH = "--inventory-path"

const JSON_FLAG = "--json"

export type InventoryFileRead =
  | { readonly inventoryPath: string | null; readonly json: boolean }
  | { readonly refused: readonly string[] }

export function readInventoryFileArgs(argv: readonly string[]): InventoryFileRead {
  const refusals: string[] = []
  let inventoryPath: string | null = null
  let json = false
  for (let at = 0; at < argv.length; at += 1) {
    const one = argv[at]
    if (one === undefined) continue
    if (one === JSON_FLAG) {
      json = true
      continue
    }
    if (one === INVENTORY_PATH) {
      const value = argv[at + 1]
      at += 1
      if (value === undefined || value.startsWith("--")) {
        refusals.push(`\`${INVENTORY_PATH}\` names the file to read, and no file followed it`)
        continue
      }
      inventoryPath = value
      continue
    }
    refusals.push(
      `\`${one}\` is nothing this takes — it takes \`${INVENTORY_PATH}\` and \`${JSON_FLAG}\``
    )
  }
  if (refusals.length > 0) return { refused: refusals }
  return { inventoryPath, json }
}
