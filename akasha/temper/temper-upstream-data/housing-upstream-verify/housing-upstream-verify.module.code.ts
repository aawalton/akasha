import { join } from "node:path"
import { EU_LIBRARY_DATA } from "@akasha/temper-housing-addon/housing-library-data-eu"
import { NA_LIBRARY_DATA } from "@akasha/temper-housing-addon/housing-library-data-na"
import { makeLuaVm } from "@akasha/temper-lua-runner/lua-vm"
import {
  gathered,
  ruledOverValues,
} from "../upstream-leaf-reading/upstream-leaf-reading.module.code.ts"
import type { Ruling } from "../upstream-libraries/upstream-libraries.module.code.ts"

const DATA_FILE = "PortToFriendsHouse/PortToFriendsHouseLibraryData.lua"

const FILTER_IDS: Record<string, number> = {
  FILTER_ID_NONE: 1,
  FILTER_ID_HIGHLIGHT: 2,
  FILTER_ID_LABYRINTH: 3,
  FILTER_ID_JUMPNRUN: 4,
  FILTER_ID_CRAFTING: 5,
  FILTER_ID_GUILD: 6,
  FILTER_ID_ROLEPLAY: 7,
  FILTER_ID_RAID: 8,
  FILTER_ID_HIDE_SEEK: 9,
  FILTER_ID_ERP: 10,
}

function preludeOf(): string {
  const constants = Object.entries(FILTER_IDS)
    .map(([name, value]) => `    ${name} = ${String(value)},`)
    .join("\n")
  return `
PortToFriend = {
  libData = {},
  constants = {
${constants}
  },
}
GetWorldName = function() return "EU Megaserver" end
return "ok"
`
}

export async function verifyHousing(addons: string): Promise<Ruling> {
  const vm = await makeLuaVm({ stubs: preludeOf() })
  try {
    const setup = await vm.run(`
      local ok, err = pcall(dofile, ${JSON.stringify(join(addons, DATA_FILE))})
      if not ok then error("dofile failed: " .. tostring(err)) end
      PortToFriend.libData.CreateEuDataList()
      PortToFriend.libData.CreateNaDataList()
      return "ok"
    `)
    if (setup !== "ok") throw new Error(`running PortToFriendsHouse answered ${String(setup)}`)

    return gathered([
      ruledOverValues(
        "EU_LIBRARY_DATA",
        await vm.run("return PortToFriend.libData.euData"),
        EU_LIBRARY_DATA
      ),
      ruledOverValues(
        "NA_LIBRARY_DATA",
        await vm.run("return PortToFriend.libData.naData"),
        NA_LIBRARY_DATA
      ),
    ])
  } finally {
    await vm.close()
  }
}
