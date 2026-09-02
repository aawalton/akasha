import "@akasha/temper-eso-types/eso-api"
import "@akasha/temper-eso-types/eso-chat"
import "@akasha/temper-eso-types/eso-functions-01"
import "@akasha/temper-eso-types/eso-functions-07"
import "@akasha/temper-eso-types/eso-globals"
import "@akasha/temper-eso-types/eso-string-ids"
import "@akasha/temper-eso-types/tstl-eso-sandbox"
let cachedMaxRapport: number | undefined

function getMaxRapport(): number {
  if (cachedMaxRapport === undefined) {
    cachedMaxRapport = GetMaximumRapport()
  }
  return cachedMaxRapport
}

export function installCompanionOverviewRapportOverlay(): undefined {
  const maxRapport = getMaxRapport()

  SecurePostHook(
    COMPANION_OVERVIEW_KEYBOARD,
    "RefreshCompanionRapport",
    function (this: void, self: CompanionOverviewKeyboard): undefined {
      const control = self.rapportStatusLabel
      if (control != null) {
        control.SetText(
          string.format("%s (%d/%d)", control.GetText(), GetActiveCompanionRapport(), maxRapport)
        )
      }
    }
  )
}

export function notifyCompanionRapportChange(
  companionId: number,
  previousRapport: number,
  currentRapport: number
): undefined {
  CHAT_ROUTER.AddSystemMessage(
    zo_strformat(
      "<<1>> <<2>>: <<3>> <<4>>",
      os.date("[%H:%M:%S]", GetTimeStamp()),
      GetString(SI_COMPANION_OVERVIEW_RAPPORT),
      GetCompanionName(companionId),
      string.format(
        "%+d (%d/%d)",
        currentRapport - previousRapport,
        currentRapport,
        getMaxRapport()
      )
    )
  )
}
