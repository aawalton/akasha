import * as nodePath from "node:path"

function nothing() {}

const anything = () =>
  new Proxy(nothing, {
    get: (_t, k) => (k === "then" ? undefined : anything()),
    apply: () => anything(),
    construct: () => anything(),
  })

class EventEmitter {
  constructor() {
    this.listeners = []
  }
  get event() {
    return (fn) => {
      this.listeners.push(fn)
      return { dispose: () => undefined }
    }
  }
  fire(value) {
    for (const one of [...this.listeners]) {
      try {
        one(value)
      } catch {}
    }
  }
  dispose() {
    this.listeners = []
  }
}

class TreeItem {
  constructor(label, collapsibleState) {
    this.label = label
    this.collapsibleState = collapsibleState
  }
}

class ThemeIcon {
  constructor(id, color) {
    this.id = id
    this.color = color
  }
}

class ThemeColor {
  constructor(id) {
    this.id = id
  }
}

class MarkdownString {
  constructor(value) {
    this.value = value ?? ""
  }
  appendMarkdown(more) {
    this.value += more
    return this
  }
  appendText(more) {
    this.value += more
    return this
  }
}

class FileDecoration {
  constructor(badge, tooltip, color) {
    this.badge = badge
    this.tooltip = tooltip
    this.color = color
  }
}

const said = (part) => (part === undefined || part === null ? "" : String(part))

const Uri = {
  file: (p) => ({
    scheme: "file",
    authority: "",
    path: p,
    fsPath: p,
    query: "",
    fragment: "",
    toString: () => `file://${p}`,
  }),
  from: (o) => ({
    scheme: said(o.scheme),
    authority: said(o.authority),
    path: said(o.path),
    fsPath: said(o.path),
    query: said(o.query),
    fragment: said(o.fragment),
    toString: () => `${said(o.scheme)}://${said(o.authority)}${said(o.path)}`,
  }),
  parse: (s) => ({
    scheme: "",
    authority: "",
    path: s,
    fsPath: s,
    query: "",
    fragment: "",
    toString: () => s,
  }),
  joinPath: (base, ...more) => Uri.file(nodePath.join(base.path, ...more)),
}

const views = new Map()

const statusItems = []

const channels = new Map()

const decorators = []

const commandsHeld = new Map()

const realWindow = {
  createTreeView: (viewId, options) => {
    const view = {
      viewId,
      provider: options === undefined ? undefined : options.treeDataProvider,
      title: undefined,
      description: undefined,
      badge: undefined,
      message: undefined,
      visible: true,
      selection: [],
      onDidChangeSelection: () => ({ dispose: () => undefined }),
      onDidChangeVisibility: () => ({ dispose: () => undefined }),
      onDidExpandElement: () => ({ dispose: () => undefined }),
      onDidCollapseElement: () => ({ dispose: () => undefined }),
      reveal: async () => undefined,
      dispose: () => undefined,
    }
    views.set(viewId, view)
    return overlaid(view)
  },
  registerTreeDataProvider: (viewId, provider) => {
    views.set(viewId, { viewId, provider, dispose: () => undefined })
    return { dispose: () => undefined }
  },
  createStatusBarItem: (id, alignment, priority) => {
    const item = {
      id: typeof id === "string" ? id : `unnamed:${statusItems.length}`,
      alignment,
      priority,
      text: "",
      color: undefined,
      backgroundColor: undefined,
      tooltip: undefined,
      command: undefined,
      shown: false,
      show() {
        this.shown = true
      },
      hide() {
        this.shown = false
      },
      dispose: () => undefined,
    }
    statusItems.push(item)
    return overlaid(item)
  },
  createOutputChannel: (name) => {
    const lines = []
    channels.set(name, lines)
    return {
      name,
      appendLine: (line) => lines.push(String(line)),
      append: (line) => lines.push(String(line)),
      replace: () => undefined,
      clear: () => {
        lines.length = 0
      },
      show: () => undefined,
      hide: () => undefined,
      dispose: () => undefined,
    }
  },
  registerFileDecorationProvider: (provider) => {
    decorators.push(provider)
    return { dispose: () => undefined }
  },
  showWarningMessage: async (message) => {
    channels.set("__warnings", [...(channels.get("__warnings") ?? []), String(message)])
    return undefined
  },
  showErrorMessage: async (message) => {
    channels.set("__errors", [...(channels.get("__errors") ?? []), String(message)])
    return undefined
  },
}

const realCommands = {
  registerCommand: (name, run) => {
    commandsHeld.set(name, run)
    return { dispose: () => commandsHeld.delete(name) }
  },
  executeCommand: async () => undefined,
  getCommands: async () => [...commandsHeld.keys()],
}

function overlaid(real) {
  return new Proxy(real, {
    get: (target, key) => (key in target ? target[key] : anything()),
  })
}

const labelOf = (item) => {
  if (item === null || item === undefined) return null
  const label = item.label
  if (typeof label === "string") return label
  if (label !== null && typeof label === "object" && typeof label.label === "string")
    return label.label
  return null
}

const textOf = (value) => {
  if (value === null || value === undefined) return null
  if (typeof value === "string") return value
  if (typeof value.value === "string") return value.value
  return null
}

const MAX_DEPTH = 12

async function rowsUnder(provider, element, depth) {
  if (depth > MAX_DEPTH) return []
  const children = await provider.getChildren(element)
  if (children === null || children === undefined) return []
  const out = []
  for (const child of children) {
    let item
    let drewNothing = null
    try {
      item = await provider.getTreeItem(child)
    } catch (err) {
      drewNothing = String((err && err.stack) || err)
    }
    out.push({
      label: labelOf(item),
      id: item === undefined ? null : typeof item.id === "string" ? item.id : null,
      description: item === undefined ? null : textOf(item.description),
      tooltip: item === undefined ? null : textOf(item.tooltip),
      resourceUri:
        item === undefined || item.resourceUri === undefined || item.resourceUri === null
          ? null
          : String(item.resourceUri.path ?? ""),
      contextValue:
        item === undefined
          ? null
          : typeof item.contextValue === "string"
            ? item.contextValue
            : null,
      hasCommand: item === undefined ? false : item.command !== undefined && item.command !== null,
      drewNothing,
      children: await rowsUnder(provider, child, depth + 1),
    })
  }
  return out
}

async function report() {
  const panels = {}
  for (const [viewId, view] of views) {
    if (view.provider === undefined || view.provider === null) {
      panels[viewId] = {
        registered: true,
        failure: "the view was created with no tree data provider",
        roots: [],
      }
      continue
    }
    try {
      panels[viewId] = {
        registered: true,
        failure: null,
        roots: await rowsUnder(view.provider, undefined, 0),
      }
    } catch (err) {
      panels[viewId] = { registered: true, failure: String((err && err.stack) || err), roots: [] }
    }
  }
  return {
    panels,
    statusBar: statusItems.map((one) => ({
      id: one.id,
      priority: typeof one.priority === "number" ? one.priority : null,
      text: typeof one.text === "string" ? one.text : null,
      tooltip: textOf(one.tooltip),
      shown: one.shown === true,
    })),
    channels: Object.fromEntries([...channels].map(([name, lines]) => [name, lines])),
    commands: [...commandsHeld.keys()].sort(),
  }
}

function makeContext() {
  return overlaid({
    subscriptions: [],
    extensionUri: Uri.file(process.cwd()),
    extensionPath: process.cwd(),
    globalState: overlaid({ get: () => undefined, update: async () => undefined, keys: () => [] }),
    workspaceState: overlaid({
      get: () => undefined,
      update: async () => undefined,
      keys: () => [],
    }),
    environmentVariableCollection: anything(),
    secrets: anything(),
  })
}

export { EventEmitter, FileDecoration, MarkdownString, ThemeColor, ThemeIcon, TreeItem, Uri }

export const TreeItemCollapsibleState = { None: 0, Collapsed: 1, Expanded: 2 }

export const StatusBarAlignment = { Left: 1, Right: 2 }

export const ViewColumn = { Active: -1, Beside: -2, One: 1, Two: 2, Three: 3 }

export const TreeItemCheckboxState = { Unchecked: 0, Checked: 1 }

export class Disposable {
  constructor(run) {
    this.dispose = run ?? (() => undefined)
  }
  static from(...items) {
    return { dispose: () => items.forEach((one) => one.dispose && one.dispose()) }
  }
}

export class RelativePattern {
  constructor(base, pattern) {
    this.baseUri = typeof base === "string" ? Uri.file(base) : base
    this.base = typeof base === "string" ? base : base && base.path
    this.pattern = pattern
  }
}

export const TabInputText = anything()

export const TabInputTextDiff = anything()

export const TabInputNotebook = anything()

export const TabInputNotebookDiff = anything()

export const TabInputTerminal = anything()

export const TabInputWebview = anything()

export const window = overlaid(realWindow)

export const commands = overlaid(realCommands)

export const workspace = overlaid({
  workspaceFolders: undefined,
  getConfiguration: () =>
    overlaid({ get: (_k, fallback) => fallback, has: () => false, update: async () => undefined }),
  onDidChangeConfiguration: () => ({ dispose: () => undefined }),
  onDidSaveTextDocument: () => ({ dispose: () => undefined }),
  openTextDocument: async () => anything(),
})

export const env = overlaid({
  clipboard: overlaid({ writeText: async () => undefined, readText: async () => "" }),
  openExternal: async () => true,
  appName: "panel-reading",
})

export const __drawings = () => {
  let lines = 0
  for (const held of channels.values()) lines += held.length
  return lines
}

export const __report = report

export const __makeContext = makeContext
