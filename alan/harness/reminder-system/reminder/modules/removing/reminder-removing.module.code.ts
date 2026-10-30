import { changeMechanicalFile } from "akasha/change/mechanical/file/change-mechanical-file.page-type.ts"
import { removeFile } from "akasha/change/mechanical/file/remove/remove-file/remove-file.change-mechanical-file.ts"
import { runMechanicalChange } from "akasha/change/runner/pages/mechanical-change-running/mechanical-change-running.change-runner.code.ts"
import { refusalsIn } from "akasha/command/modules/applying/applying.module.code.ts"
import { removeUncommitted } from "akasha/page/modules/uncommitted/page-uncommitted.module.code.ts"

const TOOK = `${changeMechanicalFile.slug}/${removeFile.slug}` as const

function tookSaid(path: string): string {
  return `${path}, taken away because the reminder it held had sent`
}

function forgotSaid(path: string): string {
  return `the values kept beside ${path}, taken away with it`
}

export async function tookReminder(
  root: string,
  path: string,
  why: string,
  done: string[] = []
): Promise<string | null> {
  const landed = await runMechanicalChange(root, [{ at: TOOK, given: { at: path } }], why)
  const wrong = refusalsIn(landed)
  if (wrong.length > 0) return wrong.join("; ")
  done.push(tookSaid(path))
  removeUncommitted(root, path)
  done.push(forgotSaid(path))
  return null
}
