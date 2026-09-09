import {
  type Startable,
  startIsolated,
} from "akasha/editor-extension/activation/activation.module.code.ts"
import * as agentTree from "akasha/editor-extension/agent-tree-panel/agent-tree-panel.module.code.ts"
import * as commandTree from "akasha/editor-extension/command-tree-panel/command-tree-panel.module.code.ts"
import * as domainTree from "akasha/editor-extension/domain-tree-panel/domain-tree-panel.module.code.ts"
import * as editorLayout from "akasha/editor-extension/editor-layout-panel/editor-layout-panel.module.code.ts"
import {
  commandServerHeard,
  disposeCommandServer,
} from "akasha/editor-extension/harness-call/harness-call.module.code.ts"
import {
  createObservationStore,
  recordObservation,
  setObservationStore,
} from "akasha/editor-extension/observation-store/observation-store.module.code.ts"
import * as pageTree from "akasha/editor-extension/page-tree-panel/page-tree-panel.module.code.ts"
import * as seatEnter from "akasha/editor-extension/seat-terminal-enter/seat-terminal-enter.module.code.ts"
import * as statusBar from "akasha/editor-extension/status-bar-panel/status-bar-panel.module.code.ts"
import * as terminalRename from "akasha/editor-extension/terminal-renaming/terminal-renaming.module.code.ts"
import * as transcript from "akasha/editor-extension/transcript-panel/transcript-panel.module.code.ts"
import { readProcess } from "akasha/editor-extension/window-identity/window-identity.module.code.ts"
import * as workTree from "akasha/editor-extension/work-tree-panel/work-tree-panel.module.code.ts"
import * as vscode from "vscode"

const FEATURE_TIMEOUT_MS = 20_000

const features = (
  context: vscode.ExtensionContext,
  say: (text: string) => void
): readonly Startable[] => [
  { name: "terminal-rename", start: async () => terminalRename.activate(context) },
  { name: "transcript", start: async () => transcript.activate(context) },
  { name: "agent-tree", start: async () => agentTree.activate(context) },
  { name: "domain-tree", start: async () => domainTree.activate(context) },
  { name: "work-tree", start: async () => workTree.activate(context) },
  { name: "page-tree", start: async () => pageTree.activate(context) },
  { name: "command-tree", start: async () => commandTree.activate(context) },
  { name: "status-bar", start: async () => statusBar.activate(context) },
  { name: "editor-layout", start: async () => editorLayout.activate(context) },
  { name: "seat-terminal-enter", start: async () => seatEnter.activate(vscode, context, say) },
]

export async function activate(context: vscode.ExtensionContext): Promise<void> {
  const output = vscode.window.createOutputChannel("Ops: Activation")
  context.subscriptions.push(output)

  commandServerHeard((text) => output.appendLine(`[verb-server] ${text.trimEnd()}`))
  context.subscriptions.push({ dispose: () => disposeCommandServer() })

  const windowName = await readProcess(process.pid)
  const observations = createObservationStore({
    window: windowName,
    onError: (message) => output.appendLine(`[observations] ${message}`),
  })
  setObservationStore(observations)
  output.appendLine(`[activate] observations to ${observations.url}`)
  context.subscriptions.push({
    dispose: () => {
      setObservationStore(undefined)
      void observations.dispose()
    },
  })

  const startables = features(context, (line) => output.appendLine(line))
  output.appendLine(`[activate] starting ${startables.length} features`)

  const outcomes = await startIsolated(startables, FEATURE_TIMEOUT_MS, (line) =>
    output.appendLine(line)
  )

  for (const outcome of outcomes) {
    recordObservation(outcome.name, {
      activation: { state: outcome.state, ms: outcome.ms },
      ...(outcome.error === undefined ? {} : { failure: outcome.error }),
    })
  }

  const missing = outcomes.filter((o) => o.state !== "activated")
  output.appendLine(
    `[activate] ${outcomes.length - missing.length} of ${outcomes.length} activated` +
      (missing.length === 0 ? "" : `; ${missing.map((o) => `${o.name} ${o.state}`).join(", ")}`)
  )

  if (missing.length > 0) {
    void vscode.window.showWarningMessage(
      `Ops: ${missing.length} of ${startables.length} features did not activate ` +
        `(${missing.map((o) => o.name).join(", ")}). The rest are running. ` +
        `See the Ops: Activation output.`
    )
  }
}

export function deactivate(): undefined {}
