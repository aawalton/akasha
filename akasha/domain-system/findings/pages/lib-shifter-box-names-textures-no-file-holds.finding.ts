import type { Finding } from "../finding.page-type.ts"

export const libShifterBoxNamesTexturesNoFileHolds = {
  id: "01a06070-0ac3-7d1c-a566-181ae4a93852",
  pageTypeSlug: "finding",
  slug: "lib-shifter-box-names-textures-no-file-holds",
  domainSlug: "domain/temper",
  claim:
    "LibShifterBox names eight arrow textures in its manifest and in its XML, and no file in the repository holds any of the eight. The two move-all buttons draw nothing today. Recreating the addon in akasha carries the missing names across unless someone decides whether to find the textures or to point the buttons at the game's own art.",
  evidence:
    "temper/shared-addon-libraries-lib-shifter-box/addon.json lists eight assets under `bin/textures/`: double_large_leftarrow and double_large_rightarrow, each in up, down, over and disabled. The package holds no `bin` folder; `find temper -name double_large_leftarrow_up.dds` answers nothing. metadata/ShifterBox/ShifterBoxTemplate.xml points the two move-all buttons at `/LibShifterBox/bin/textures/...` at lines 68 to 71 and 152 to 155. The four single-move buttons and the search button point at `/esoui/art/...` instead and draw correctly.",
} as const satisfies Finding
