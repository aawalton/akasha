import "akasha/temper/addon/library-type/temper-keybinder-global/temper-keybinder-global.type-declaration.d.ts"

import { toggleShareState } from "akasha/temper/addon/pages/keybinder/modules/keybinder-share/keybinder-share.module.code.ts"

globalThis.TemperKeybinder = { ToggleShareState: toggleShareState }
