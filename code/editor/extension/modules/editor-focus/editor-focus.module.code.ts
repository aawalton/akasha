import { mkdirSync, readdirSync, readFileSync, rmSync, writeFileSync } from "node:fs"
import { join } from "node:path"
import { supervisorsRootDir } from "akasha/agent/seat/supervisor/supervisor-log/modules/path/supervisor-log-path.module.code.ts"
import { pidAliveOrAssumeDead } from "akasha/code/process/modules/pid-signal/pid-signal.module.code.ts"
import type * as vscode from "vscode"

const FOCUS_DIR = "editor-focus"

const FOCUSED = "focused"

export function focusDir(): string {
  return join(supervisorsRootDir(), FOCUS_DIR)
}

export function focusWritten(dir: string, windowPid: number, focused: boolean): undefined {
  mkdirSync(dir, { recursive: true })
  writeFileSync(join(dir, String(windowPid)), focused ? FOCUSED : "")
  return undefined
}

function focusedIn(dir: string, name: string, living: (pid: number) => boolean): boolean {
  const pid = Number(name)
  if (!Number.isInteger(pid) || !living(pid)) return false
  try {
    return readFileSync(join(dir, name), "utf8") === FOCUSED
  } catch {
    return false
  }
}

export function editorFocused(
  dir: string = focusDir(),
  living: (pid: number) => boolean = pidAliveOrAssumeDead
): boolean {
  try {
    return readdirSync(dir).some((name) => focusedIn(dir, name, living))
  } catch {
    return false
  }
}

export function activate(api: typeof vscode, context: vscode.ExtensionContext): undefined {
  const dir = focusDir()
  const written = (focused: boolean): undefined => focusWritten(dir, process.pid, focused)
  written(api.window.state.focused)
  context.subscriptions.push(
    api.window.onDidChangeWindowState((state) => written(state.focused)),
    { dispose: () => rmSync(join(dir, String(process.pid)), { force: true }) }
  )
  return undefined
}
