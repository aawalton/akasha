import * as vscode from "vscode"

export function renamed(terminal: vscode.Terminal, name: string): undefined {
  terminal.rename(name)
  return undefined
}

export function counted(item: vscode.TreeItem): number | undefined {
  return item.count
}

export function instanced(input: vscode.TabInputTerminal): number | undefined {
  return input.instanceId
}

export function recoloured(terminal: vscode.Terminal): undefined {
  terminal.recolor(undefined)
  return undefined
}
