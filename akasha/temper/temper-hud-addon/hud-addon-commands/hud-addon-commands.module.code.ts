import "@akasha/temper-eso-types/eso-globals"
import "@akasha/temper-eso-types/tstl-eso-sandbox"

import { createCommandRegistry } from "../hud-addon-command-registry/hud-addon-command-registry.module.code.ts"
import type { TemperCommand } from "../hud-addon-types/hud-addon-types.module.code.ts"

const registry = createCommandRegistry()

export function registerTemperCommand(this: void, command: TemperCommand): undefined {
  registry.register(command)
}

function renderTemperHelp(this: void): undefined {
  d("TEMPER COMMANDS:")
  const commands = registry.list()
  if (commands.length === 0) {
    d("  (no commands registered)")
    return
  }
  const addons: string[] = []
  for (const command of commands) {
    if (!addons.includes(command.addon)) addons.push(command.addon)
  }
  for (const addon of addons) {
    d(`  ${addon}:`)
    for (const command of commands) {
      if (command.addon === addon) {
        const invocation = command.handler !== undefined ? `/temper ${command.name}` : command.name
        d(`    ${invocation} - ${command.description}`)
      }
    }
  }
}

function dispatchTemperCommand(this: void, args: string): undefined {
  const argsStr = args !== undefined ? args : ""
  const [subcommand, rest] = string.match(argsStr, "^%s*(%S+)%s*(.-)$")
  if (subcommand === undefined) {
    renderTemperHelp()
    return
  }
  const command = registry.find(subcommand)
  if (command === undefined || command.handler === undefined) {
    d(`[Temper] Unknown command "/temper ${subcommand}". Try /temper help`)
    return
  }
  command.handler(rest ?? "")
}

export function initializeTemperCommands(this: void): undefined {
  registerTemperCommand({
    name: "help",
    description: "List every Temper slash command",
    addon: "TemperHud",
    handler: renderTemperHelp,
  })
  registerTemperCommand({
    name: "/temperhud",
    description: "Open HUD settings",
    addon: "TemperHud",
  })
  SLASH_COMMANDS["/temper"] = dispatchTemperCommand
}
