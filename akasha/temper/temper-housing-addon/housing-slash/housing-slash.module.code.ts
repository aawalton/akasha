import "@akasha/temper-eso-types/eso-extra"
import "@akasha/temper-eso-types/eso-functions-01"
import "@akasha/temper-eso-types/eso-functions-02"
import "@akasha/temper-eso-types/eso-functions-08"
import "@akasha/temper-eso-types/eso-objects-01"
import "@akasha/temper-eso-types/eso-ui-2"
import "@akasha/temper-eso-types/tstl-eso-sandbox"
import "@akasha/temper-eso-types/tstl-language-extensions"
import { portToFriend } from "../housing-state/housing-state.module.code.ts"

interface HouseControls {
  editbox: EditControl
}
function asHouseControls(value: unknown): HouseControls {
  return value as HouseControls
}

function parseCmd(this: void, cmd: string, param: string): LuaMultiReturn<[string, string]> {
  param = zo_strtrim(param)
  cmd = zo_strtrim(cmd)

  const [cmdIndex] = string.find(param, " ")
  if (cmdIndex !== undefined) {
    cmd = zo_strtrim(string.sub(param, 1, cmdIndex))
    param = zo_strtrim(string.sub(param, cmdIndex + 1))
  } else {
    cmd = param
    param = ""
  }
  return $multi(cmd, param)
}
portToFriend.ParseCmd = parseCmd

function portToMainResidence(this: void): undefined {
  const house = asHouseControls(portToFriend.controls.house)
  let name = house.editbox.GetText()
  if (
    string.lower(name) === string.lower(GetUnitName("player")) ||
    string.lower(name) === string.lower(GetDisplayName()) ||
    name === undefined ||
    zo_strtrim(name) === ""
  ) {
    name = GetDisplayName()
  }
  portToFriend.JumpToDefaultHouse(name)
}
portToFriend.PortToMainResidence = portToMainResidence

function jumpToDefaultHouse(this: void, player: string): undefined {
  if (player !== undefined && player !== "") {
    if (player === GetDisplayName() || player === undefined || zo_strtrim(player) === "") {
    } else {
      JumpToHouse(player)
    }
  }
}
portToFriend.JumpToDefaultHouse = jumpToDefaultHouse
