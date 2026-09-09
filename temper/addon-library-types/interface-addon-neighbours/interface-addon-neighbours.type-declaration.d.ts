declare let MAP_MODE_VOTANS_MINIMAP: number | undefined

declare const BMU: { toggleZoneGuide?: unknown } | undefined

declare const Teleporter: { toggleZoneGuide?: unknown } | undefined

interface VotansMenuSettingsGlobal {
  IsMenuButtonEnabled: (this: VotansMenuSettingsGlobal) => boolean
}

declare const VOTANS_MENU_SETTINGS: VotansMenuSettingsGlobal | undefined

interface MailBuddyGlobal {
  settingsVars: {
    settings?: {
      SetRecipient?: string[]
      SetSubject?: string[]
    }
  }
}

declare const MailBuddy: MailBuddyGlobal | undefined

declare const MailBuddy_SavedVars: object | undefined

declare const NO_THANK_YOU_VARS: unknown

declare const PerfectPixel: unknown
