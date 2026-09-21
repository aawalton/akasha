import { SLASH_COMMANDER } from "akasha/temper/addon/pages/crafting/modules/slash-commander-surface/slash-commander-surface.module.code.ts"
import { strOrKey as wwStr } from "akasha/temper/addon/pages/crafting/modules/writ-i18n/writ-i18n.module.code.ts"
import "akasha/temper/addon/pages/crafting/modules/slash-commander-init/slash-commander-init.module.code.ts"
import "akasha/temper/addon/pages/crafting/modules/writ-public-api/writ-public-api.module.code.ts"
import "akasha/design/language/lua-compiler/eso-sandbox/eso-sandbox.type-declaration.d.ts"
import "akasha/temper/addon/pages/crafting/writ-writworthy-global/writ-writworthy-global.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-01/eso-functions-01.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-02/eso-functions-02.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-09/eso-functions-09.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-globals/eso-globals.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-writ-slash/eso-writ-slash.type-declaration.d.ts"
import "akasha/temper/addon/type/temper-hud-global/temper-hud-global.type-declaration.d.ts"

export function forget(this: void): undefined {
  const sc = TemperWrit.savedChariables
  if (sc !== undefined) {
    sc.writ_unique_id = {}
  }
}

export function serverName(this: void): string {
  let name = TemperWrit.server_name
  if (name === undefined) {
    name = "NA"
    const plat = GetCVar("LastPlatform")
    if (plat === "Live-EU") {
      name = "EU"
    }
    TemperWrit.server_name = name
  }
  return name
}

export function port(this: void): undefined {
  let owner = "@ziggr"
  let houseId = 46
  if (serverName() === "NA") {
  } else {
    owner = "@PhnxZ"
    houseId = 80
  }

  const fmt = wwStr("msg_port_house")
  TemperWrit.Log?.Info(fmt, owner, houseId)

  if (owner === GetDisplayName()) {
    RequestJumpToHouse(houseId)
  } else {
    JumpToSpecificHouse(owner, houseId)
  }
}

export function slashCommand(this: void, arg1: string): undefined {
  arg1 = string.lower(arg1)
  if (arg1 === string.lower(wwStr("slash_discover"))) {
    d("|c999999TemperWrit: " + wwStr("status_discover") + "|r")
    TemperWrit.Smithing?.Discover()
    TemperWrit.DiscoverI18N?.()
  } else if (arg1 === string.lower(wwStr("slash_forget"))) {
    d("|c999999TemperWrit: " + wwStr("status_forget") + "|r")
    TemperWrit.Forget?.()
  } else if (arg1 === string.lower(wwStr("slash_port"))) {
    TemperWrit.Port?.()
  } else if (arg1 === string.lower(wwStr("slash_count"))) {
    const mwlist = TemperWrit.ScanInventoryForMasterWrits?.() ?? []
    const mwCt = mwlist.length
    let voucherCt = 0
    for (const mw of mwlist) {
      const vc = TemperWrit.ToVoucherCount?.(mw.item_link) ?? 0
      voucherCt = voucherCt + vc
    }
    d(
      string.format(
        "|c999999TemperWrit: " + wwStr("count_writs_vouchers") + "|r",
        mwCt,
        TemperWrit.Util?.ToMoney(voucherCt) ?? ""
      )
    )
  } else if (arg1 === string.lower(wwStr("slash_auto"))) {
    if (TemperWrit_AutoQuest !== undefined) {
      TemperWrit_AutoQuest()
    }
  } else {
    slashCommand(wwStr("slash_count"))
  }
}

export function registerSlashCommands(this: void): undefined {
  const cmd = SLASH_COMMANDER.Register(
    "/temperwrit",
    function (this: void, arg?: string) {
      slashCommand(arg ?? "")
    },
    wwStr("slash_writworthy_desc")
  )

  const subForget = cmd.RegisterSubCommand()
  subForget.AddAlias(wwStr("slash_forget"))
  subForget.SetCallback(() => {
    slashCommand(wwStr("slash_forget"))
  })
  subForget.SetDescription(wwStr("slash_forget_desc"))

  const subCount = cmd.RegisterSubCommand()
  subCount.AddAlias(wwStr("slash_count"))
  subCount.SetCallback(() => {
    slashCommand(wwStr("slash_count"))
  })
  subCount.SetDescription(wwStr("slash_count_desc"))

  const subPort = cmd.RegisterSubCommand()
  subPort.AddAlias(wwStr("slash_port"))
  subPort.SetCallback(() => {
    slashCommand(wwStr("slash_port"))
  })
  subPort.SetDescription(wwStr("slash_port_desc"))

  if (GetDisplayName() === "@ziggr") {
    const subDiscover = cmd.RegisterSubCommand()
    subDiscover.AddAlias(wwStr("slash_discover"))
    subDiscover.SetCallback(() => {
      slashCommand(wwStr("slash_discover"))
    })
    subDiscover.SetDescription(wwStr("slash_discover_desc"))
  }

  if (TemperWrit.AQAddKeyBind !== undefined) {
    const subAuto = cmd.RegisterSubCommand()
    subAuto.AddAlias(wwStr("slash_auto"))
    subAuto.SetCallback(() => {
      slashCommand(wwStr("slash_auto"))
    })
    subAuto.SetDescription(wwStr("slash_auto_desc"))
  }

  globalThis.TemperHud?.registerCommand({
    name: "/temperwrit",
    description: "Master-writ crafting helper",
    addon: "TemperCrafting",
  })
}

TemperWrit.Forget = forget
TemperWrit.ServerName = serverName
TemperWrit.Port = port
TemperWrit.SlashCommand = slashCommand
TemperWrit.RegisterSlashCommands = registerSlashCommands
