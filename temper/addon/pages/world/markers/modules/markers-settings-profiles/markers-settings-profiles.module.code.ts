import {
  askForName,
  showDialogue,
} from "akasha/temper/addon/pages/world/markers/modules/markers-dialogs/markers-dialogs.module.code.ts"
import { insertPremades } from "akasha/temper/addon/pages/world/markers/modules/markers-premades/markers-premades.module.code.ts"
import { showMultiProfileSelect } from "akasha/temper/addon/pages/world/markers/modules/markers-profile-dialogs/markers-profile-dialogs.module.code.ts"
import {
  ADDITIONAL_DROPDOWN,
  createMergedProfile,
  deleteCurrentProfile,
  loadAdditionalProfiles,
  loadProfile,
  PROFILE_DROPDOWN,
  renameCurrentProfile,
  updateProfileDropdown,
} from "akasha/temper/addon/pages/world/markers/modules/markers-profiles/markers-profiles.module.code.ts"
import type { MarkerOption } from "akasha/temper/addon/pages/world/markers/modules/markers-settings-placing/markers-settings-placing.module.code.ts"
import { shareCurrentZone } from "akasha/temper/addon/pages/world/markers/modules/markers-sharing/markers-sharing.module.code.ts"
import {
  MM,
  refreshLoadedProfile,
} from "akasha/temper/addon/pages/world/markers/modules/markers-state/markers-state.module.code.ts"
import "akasha/temper/eso/type/eso-functions-01/eso-functions-01.type-declaration.d.ts"

const OVERWRITTEN = "If the desired name is already a profile, it will be overwritten."

function currentProfile(this: void): string {
  const [zone] = GetUnitRawWorldPosition("player")
  return MM.vars.loadedProfile[zone] ?? "Default"
}

function mergeProfiles(this: void): undefined {
  showMultiProfileSelect((profiles) => {
    if (profiles.length === 0) return
    askForName(
      "Merging Profiles",
      "What would you like to name the new profile?",
      OVERWRITTEN,
      (name) => {
        createMergedProfile(name ?? "Default", profiles)
      }
    )
  })
  return undefined
}

export function profileOptions(this: void): MarkerOption[] {
  return [
    { type: "description", title: "|cFFD700[Profiles]|r", width: "full" },
    {
      type: "description",
      title: () => string.format("Current Loaded Profile: |cFFD700%s|r", currentProfile()),
      text: () =>
        string.format(
          "Last Edited at: |c0DC1CF%s|r",
          os.date("%a, %b %d %Y - %I:%M %p", MM.currentTimestamp)
        ),
      reference: "TemperWorldMarkersProfilesCurrentLoadedProfile",
      width: "full",
    },
    {
      type: "dropdown",
      name: "Profile Selection",
      width: "half",
      scrollable: 10,
      reference: PROFILE_DROPDOWN,
      choices: [],
      getFunc: () => {
        updateProfileDropdown(false)
        return currentProfile()
      },
      setFunc: (value: string) => {
        MM.currentLoadProfileName = value
        loadProfile(value)
        refreshLoadedProfile()
        MM.currentAdditionalProfiles = []
        MM.multipleProfilesLoaded = false
      },
    },
    {
      type: "button",
      name: "|cFF5555Delete Profile|r",
      warning: "This will delete all markers in the current profile.",
      width: "half",
      func: () => {
        showDialogue(
          "Warning: Destructive Action",
          "Are you sure you would like to empty the current loaded profile?",
          "This is a destructive action and cannot be undone.",
          () => {
            deleteCurrentProfile()
            refreshLoadedProfile()
          }
        )
      },
    },
    {
      type: "button",
      name: "Create Profile",
      width: "half",
      func: () => {
        askForName(
          "Creating Profile",
          "What would you like to name the new profile?",
          "",
          (name) => {
            loadProfile(name ?? "Default")
            refreshLoadedProfile()
          }
        )
      },
    },
    {
      type: "button",
      name: "Rename Profile",
      width: "half",
      func: () => {
        askForName(
          "Renaming Profile",
          "What would you like to rename the current profile to?",
          OVERWRITTEN,
          (name) => {
            renameCurrentProfile(name)
            refreshLoadedProfile()
          }
        )
      },
    },
    {
      type: "dropdown",
      name: "Load Additional Profiles",
      width: "half",
      scrollable: 10,
      reference: ADDITIONAL_DROPDOWN,
      warning: "You cannot place or remove markers while multiple profiles are loaded.",
      choices: [],
      multiSelect: true,
      getFunc: () => {
        updateProfileDropdown(false, true)
        return MM.currentAdditionalProfiles
      },
      setFunc: (value: string[]) => {
        MM.currentAdditionalProfiles = value
        loadAdditionalProfiles(value)
      },
    },
    {
      type: "button",
      name: "Insert Premade Profiles",
      tooltip:
        "More Markers has a few premade profiles for a few trials, created from both converting from Elms Markers strings and Hand Placement. This button will import these premade markers as new profiles.\n\nPremade profiles are available for vAS, vOC, vSS, vRG, vLC, vKA, vDSR, and vSE.",
      width: "half",
      func: () => {
        showDialogue(
          "Premade Profiles",
          "Would you like to install the premade profiles? These profiles were made by M0R, both via a conversion of Elms Markers and Hand Placement.\n\nThis will NOT replace your current profiles, but instead add them on top.",
          "",
          () => insertPremades()
        )
      },
    },
    {
      type: "button",
      name: "Unload Additional Profiles",
      tooltip: "Unloads all of the additional Profiles",
      width: "half",
      func: () => {
        showDialogue(
          "Unloading Profiles",
          "Would you like to unload all the additional loaded profiles?",
          "This will not unload your main active profile.",
          () => {
            MM.currentAdditionalProfiles = []
            loadAdditionalProfiles([])
          }
        )
      },
    },
    {
      type: "button",
      name: "Merge Profiles",
      tooltip: "Merges multiple profiles into one",
      width: "half",
      func: mergeProfiles,
    },
    {
      type: "button",
      name: "Duplicate Profile",
      tooltip: "Creates a copy of the currently loaded profile",
      width: "half",
      func: () => {
        askForName(
          "Duplicating Profile",
          "What would you like to name the new profile?",
          OVERWRITTEN,
          (name) => {
            renameCurrentProfile(name, true)
            refreshLoadedProfile()
          }
        )
      },
    },
    {
      type: "button",
      name: "|c0DC1CFShare Profile|r",
      tooltip:
        "This button will share the currently loaded profile with everyone in the group, without needing to share a custom string.",
      width: "half",
      func: () => {
        showDialogue(
          "Transmitting Profile",
          "Would you like to share your currently loaded profile to everyone in the group?",
          "This will open a popup on their screen when the sharing finishes, and should probably not be used in combat.",
          () => shareCurrentZone()
        )
      },
    },
    { type: "divider" },
  ]
}
