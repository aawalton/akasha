import { type Startable, startIsolated } from "@akasha/editor-extension/activation"
import * as agentTree from "@akasha/editor-extension/agent-tree-panel"
import * as domainTree from "@akasha/editor-extension/domain-tree-panel"
import * as editorLayout from "@akasha/editor-extension/editor-layout-panel"
import { commandServerHeard, disposeCommandServer } from "@akasha/editor-extension/harness-call"
import {
  createObservationStore,
  recordObservation,
  setObservationStore,
} from "@akasha/editor-extension/observation-store"
import * as pageTree from "@akasha/editor-extension/page-tree-panel"
import * as statusBar from "@akasha/editor-extension/status-bar-panel"
import * as terminalRename from "@akasha/editor-extension/terminal-renaming"
import * as transcript from "@akasha/editor-extension/transcript-panel"
import { readProcess } from "@akasha/editor-extension/window-identity"
import * as workTree from "@akasha/editor-extension/work-tree-panel"
import * as vscode from "vscode"

const FEATURE_TIMEOUT_MS = 20_000

const features = (context: vscode.ExtensionContext): readonly Startable[] => [
  { name: "terminal-rename", start: async () => terminalRename.activate(context) },
  { name: "transcript", start: async () => transcript.activate(context) },
  { name: "agent-tree", start: async () => agentTree.activate(context) },
  { name: "domain-tree", start: async () => domainTree.activate(context) },
  { name: "work-tree", start: async () => workTree.activate(context) },
  { name: "page-tree", start: async () => pageTree.activate(context) },
  { name: "status-bar", start: async () => statusBar.activate(context) },
  { name: "editor-layout", start: async () => editorLayout.activate(context) },
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

  const startables = features(context)
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
