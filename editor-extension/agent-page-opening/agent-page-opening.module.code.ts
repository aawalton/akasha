import * as vscode from "vscode"
import { z } from "zod"
import { output } from "../agent-tree-state/agent-tree-state.module.code.ts"

const OPEN_COMMAND = "vscode.open"

const PAGE_ROW_SCHEMA = z.looseObject({
  name: z.string().min(1),
  at: z.string().min(1),
})

export interface PageRow {
  readonly name: string
  readonly at: string
}

export function pageRowIn(invoked: unknown): PageRow | undefined {
  const parsed = PAGE_ROW_SCHEMA.safeParse(invoked)
  return parsed.success ? { name: parsed.data.name, at: parsed.data.at } : undefined
}

export async function openAgentPage(invoked: unknown): Promise<undefined> {
  const row = pageRowIn(invoked)
  if (row === undefined) {
    void vscode.window.showInformationMessage("akasha holds no page for that row.")
    output.appendLine("[open-page] the row carries no page, so nothing was opened")
    return undefined
  }
  await vscode.commands.executeCommand(OPEN_COMMAND, vscode.Uri.file(row.at), { preview: true })
  output.appendLine(`[open-page] ${row.name}: ${row.at}`)
  return undefined
}
