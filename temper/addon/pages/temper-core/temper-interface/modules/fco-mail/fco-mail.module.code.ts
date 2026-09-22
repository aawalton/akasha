import { mailContextMenuSetup } from "akasha/temper/addon/pages/temper-core/temper-interface/modules/fco-mail-buttons/fco-mail-buttons.module.code.ts"
import "akasha/design/language/lua-compiler/eso-sandbox/eso-sandbox.type-declaration.d.ts"
import "akasha/temper/addon/pages/items/crafting-station/potion-decl-controls/potion-decl-controls.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-api-2/eso-api-2.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-globals/eso-globals.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-interface-extra-2/eso-interface-extra-2.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-interface-extra-3/eso-interface-extra-3.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-ui/eso-ui.type-declaration.d.ts"

export function mailStuff(this: void, whatType?: string): undefined {
  const typesToPrepare: Record<string, boolean> = {
    ContextMenu: false,
  }
  if (whatType === undefined) {
    for (const [k] of pairs(typesToPrepare)) {
      typesToPrepare[k] = true
    }
  } else {
    typesToPrepare[whatType] = true
  }

  if (typesToPrepare.ContextMenu === true) {
    mailContextMenuSetup()
  }
}

interface ZoDialog1Control extends Control {
  name?: string
  data?: { profileIndex?: number; editBoxText?: string }
}

function isZoDialog1Control(this: void, control: Control): control is ZoDialog1Control {
  return type(control) === "table" || type(control) === "userdata"
}

function resolveZoDialog1(this: void): ZoDialog1Control {
  if (isZoDialog1Control(ZO_Dialog1)) {
    return ZO_Dialog1
  }
  error("FCOCS mail: ZO_Dialog1 control missing")
}

const zoDialog1 = resolveZoDialog1()

function onDialogShownHook(this: void): undefined {
  zo_callLater(() => {
    if (!ZO_Dialogs_IsShowingDialog()) {
      return
    }
    if (zoDialog1.name !== "FCOCS_ADD_MAIL_PROFILE_DIALOG") {
      return
    }
    const data = zoDialog1.data
    if (data === undefined) {
      return
    }
    if (data.profileIndex !== undefined && data.editBoxText !== undefined) {
      const editControl = ZO_Dialog1EditBox
      if (editControl !== undefined) {
        editControl.SetText(data.editBoxText)
      }
    }
  }, 50)
}

if (zoDialog1.GetHandler("OnEffectivelyShown") !== undefined) {
  ZO_PostHookHandler(zoDialog1, "OnEffectivelyShown", onDialogShownHook)
} else {
  zoDialog1.SetHandler("OnEffectivelyShown", onDialogShownHook)
}
