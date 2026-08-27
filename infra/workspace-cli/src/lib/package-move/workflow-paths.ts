import { listFiles, readText, writeText } from "./fs"
import type { Logger } from "./logger"
import { applyQuotedPrefix, applyTemplateTail } from "./rename-primitives"
import type { WorkspaceMove } from "./types"

const WORKFLOW_BASENAMES = new Set([
  "foundation.workflow.ts",
  "apps.workflow.ts",
  "checks.workflow.ts",
  "cleanup.workflow.ts",
])

function isWorkflowFile(path: string): boolean {
  const base = path.split("/").pop() ?? ""
  if (WORKFLOW_BASENAMES.has(base)) return true
  return base.endsWith(".gate.workflow.ts")
}

export function rewriteWorkflowPaths(root: string, move: WorkspaceMove, log: Logger): undefined {
  const files = listFiles(root, ".").filter(isWorkflowFile)
  log.info(`\n[workflow-paths] scanning ${files.length} workflow files`)

  let filesTouched = 0
  let totalReplacements = 0

  for (const file of files) {
    const original = readText(root, file)
    let text = original
    let count = 0

    if (move.old !== move.new) {
      const quoted = applyQuotedPrefix(text, move.old, move.new)
      text = quoted.text
      count += quoted.count
      const tail = applyTemplateTail(text, move.old, move.new)
      text = tail.text
      count += tail.count
    }

    if (move.oldName !== move.newName) {
      const nameQuoted = applyQuotedPrefix(text, move.oldName, move.newName)
      text = nameQuoted.text
      count += nameQuoted.count
    }

    if (count === 0 || text === original) continue

    writeText(root, file, text)
    filesTouched += 1
    totalReplacements += count
    log.info(`  ${file} (${count} replacement(s))`)
  }

  log.info(`[workflow-paths] touched ${filesTouched} file(s), ${totalReplacements} replacement(s)`)
}
