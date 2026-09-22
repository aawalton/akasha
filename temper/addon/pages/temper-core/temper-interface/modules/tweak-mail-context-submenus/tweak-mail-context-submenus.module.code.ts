import {
  addAsFavoriteString,
  deleteFavoriteString,
  deleteProfileString,
  favoriteText,
  getMailSettings,
  type MailFieldType,
  mailTextShortener,
  profilesText,
} from "akasha/temper/addon/pages/temper-core/temper-interface/modules/tweak-mail-data/tweak-mail-data.module.code.ts"
import {
  addToFavorites,
  checkIfNotAlreadyIn,
  removeSavedValue,
  setMailValue,
} from "akasha/temper/addon/pages/temper-core/temper-interface/modules/tweak-mail-store/tweak-mail-store.module.code.ts"
import "akasha/design/language/lua-compiler/eso-sandbox/eso-sandbox.type-declaration.d.ts"
import "akasha/temper/addon/type/temper-scrollable-menu-global/temper-scrollable-menu-global.type-declaration.d.ts"

export function checkMaxFavoritesAndCreateSubMenus(
  this: void,
  fieldType: MailFieldType,
  noAdd?: boolean
): boolean {
  const skipAdd = noAdd ?? false
  let wasSomethingAdded = false

  const settings = getMailSettings()
  const favEntries = settings.mailFavoritesSaved[fieldType] ?? []
  const splitMailFavoritesIntoAlphabet = settings.splitMailFavoritesIntoAlphabet
  const numFavorites = favEntries.length

  if (numFavorites > 0 || !skipAdd) {
    TemperScrollableMenuAddEntry(
      favoriteText,
      () => {},
      TEMPER_SCROLLABLE_MENU_ENTRY_TYPE_HEADER,
      undefined,
      {
        doNotFilter: true,
      }
    )
    wasSomethingAdded = true
  }

  if (numFavorites > 0) {
    if (splitMailFavoritesIntoAlphabet === true) {
      const aToE: unknown[] = []
      const fToJ: unknown[] = []
      const kToO: unknown[] = []
      const pToT: unknown[] = []
      const uToZ: unknown[] = []
      const others: unknown[] = []

      for (const [, favEntryData] of ipairs(favEntries)) {
        let firstChar = string.lower(string.sub(favEntryData, 1, 1))
        if (firstChar === "@") {
          firstChar = string.lower(string.sub(favEntryData, 2, 2))
        }

        let tabToAdd: unknown[]
        if ((firstChar >= "a" && firstChar <= "e") || firstChar === "ä") {
          tabToAdd = aToE
        } else if (firstChar >= "f" && firstChar <= "j") {
          tabToAdd = fToJ
        } else if ((firstChar >= "k" && firstChar <= "o") || firstChar === "ö") {
          tabToAdd = kToO
        } else if (firstChar >= "p" && firstChar <= "t") {
          tabToAdd = pToT
        } else if ((firstChar >= "u" && firstChar <= "z") || firstChar === "ü") {
          tabToAdd = uToZ
        } else {
          tabToAdd = others
        }

        const shortText = mailTextShortener(favEntryData)
        const favEntryDataInSubmenu = {
          label: shortText,
          callback: () => {
            setMailValue(fieldType, favEntryData)
          },
          isAlphabeticallySplitHeadline: true,
          entries: [
            {
              label: `Select '${shortText}'`,
              callback: () => {
                setMailValue(fieldType, favEntryData)
              },
            },
            {
              entryType: TEMPER_SCROLLABLE_MENU_ENTRY_TYPE_DIVIDER,
            },
            {
              label: deleteFavoriteString(shortText),
              callback: () => {
                removeSavedValue(fieldType, true, favEntryData)
              },
            },
          ],
        }
        tabToAdd[tabToAdd.length] = favEntryDataInSubmenu
      }

      if (aToE.length > 0) {
        TemperScrollableMenuAddSubMenuEntry("A - E", aToE)
        wasSomethingAdded = true
      }
      if (fToJ.length > 0) {
        TemperScrollableMenuAddSubMenuEntry("F - J", fToJ)
        wasSomethingAdded = true
      }
      if (kToO.length > 0) {
        TemperScrollableMenuAddSubMenuEntry("K - O", kToO)
        wasSomethingAdded = true
      }
      if (pToT.length > 0) {
        TemperScrollableMenuAddSubMenuEntry("P - T", pToT)
        wasSomethingAdded = true
      }
      if (uToZ.length > 0) {
        TemperScrollableMenuAddSubMenuEntry("U - Z", uToZ)
        wasSomethingAdded = true
      }
      if (others.length > 0) {
        TemperScrollableMenuAddSubMenuEntry("Other", others)
        wasSomethingAdded = true
      }
    } else {
      for (const [, favEntryData] of ipairs(favEntries)) {
        const shortText = mailTextShortener(favEntryData)
        const favEntryDataSubmenu = [
          {
            label: `Select '${shortText}'`,
            callback: () => {
              setMailValue(fieldType, favEntryData)
            },
          },
          {
            entryType: TEMPER_SCROLLABLE_MENU_ENTRY_TYPE_DIVIDER,
          },
          {
            label: deleteFavoriteString(shortText),
            callback: () => {
              removeSavedValue(fieldType, true, favEntryData)
            },
          },
        ]
        TemperScrollableMenuAddSubMenuEntry(favEntryData, favEntryDataSubmenu, () => {
          setMailValue(fieldType, favEntryData)
        })
        wasSomethingAdded = true
      }
    }
  }

  if (!skipAdd) {
    const result = checkIfNotAlreadyIn(fieldType, true, undefined, false)
    if (result.isNotIn === true && result.currentText !== undefined) {
      const shortText = mailTextShortener(result.currentText)
      const currentText = addAsFavoriteString(shortText)
      TemperScrollableMenuAddEntry(currentText, () => {
        addToFavorites(fieldType, undefined)
      })
      wasSomethingAdded = true
    }
  }

  return wasSomethingAdded
}

export function checkMaxProfilesAndCreateSubMenus(this: void, noAdd?: boolean): boolean {
  const skipAdd = noAdd ?? false
  let wasSomethingAdded = false

  const settings = getMailSettings()
  const profileEntries = settings.mailProfiles
  const numProfiles = profileEntries.length

  if (numProfiles > 0 && !skipAdd) {
    TemperScrollableMenuAddEntry(
      profilesText,
      () => {},
      TEMPER_SCROLLABLE_MENU_ENTRY_TYPE_HEADER,
      undefined,
      {
        doNotFilter: true,
      }
    )
    wasSomethingAdded = true
  }

  if (numProfiles > 0) {
    for (const [profileIndex, profileEntryData] of ipairs(profileEntries)) {
      const profileName = profileEntryData._name
      if (profileName === undefined) {
        return wasSomethingAdded
      }

      const recipient = profileEntryData.recipient
      const subject = profileEntryData.subject
      const text = profileEntryData.text
      if (
        (recipient === undefined && subject === undefined && text === undefined) ||
        (recipient === "" && subject === "" && text === "")
      ) {
        return wasSomethingAdded
      }

      const shortText = mailTextShortener(profileName)
      const profileEntryDataSubmenu: unknown[] = [
        {
          label: `Select '${shortText}'`,
          callback: () => {
            setMailValue(undefined, profileIndex, undefined, true)
          },
        },
      ]

      const profileData = profileEntries[profileIndex - 1]
      if (profileData !== undefined) {
        if (profileData.recipient !== undefined) {
          profileEntryDataSubmenu[profileEntryDataSubmenu.length] = {
            label: `Recipient: '${profileData.recipient}'`,
            callback: () => {},
            enabled: false,
          }
        }
        if (profileData.subject !== undefined) {
          const shortTextSubject = mailTextShortener(profileData.subject)
          profileEntryDataSubmenu[profileEntryDataSubmenu.length] = {
            label: `Subject: '${shortTextSubject}'`,
            callback: () => {},
            enabled: false,
          }
        }
        if (profileData.text !== undefined) {
          const shortTextText = mailTextShortener(profileData.text)
          profileEntryDataSubmenu[profileEntryDataSubmenu.length] = {
            label: `Text: '${shortTextText}'`,
            callback: () => {},
            enabled: false,
          }
        }
      }
      profileEntryDataSubmenu[profileEntryDataSubmenu.length] = {
        entryType: TEMPER_SCROLLABLE_MENU_ENTRY_TYPE_DIVIDER,
      }
      profileEntryDataSubmenu[profileEntryDataSubmenu.length] = {
        label: deleteProfileString(shortText),
        callback: () => {
          removeSavedValue(undefined, false, profileIndex, true)
        },
      }

      TemperScrollableMenuAddSubMenuEntry(profileName, profileEntryDataSubmenu, () => {
        setMailValue(undefined, profileIndex, undefined, true)
      })
      wasSomethingAdded = true
    }
  }

  return wasSomethingAdded
}
