import { LORE_LIBRARY_SHALIDOR } from "../lorebooks-constants/lorebooks-constants.module.code.ts"
import { loreBooksGetNewLoreCollectionInfo } from "../lorebooks-data-accessors/lorebooks-data-accessors.module.code.ts"
import { REPORT_STATE } from "../lorebooks-report-state/lorebooks-report-state.module.code.ts"
import {
  buildEideticReportPerCollection,
  buildEideticReportPerMap,
} from "../lorebooks-reports-eidetic/lorebooks-reports-eidetic.module.code.ts"

export function showLoreLibraryReport(forceHide?: boolean): undefined {
  LoreBooksCopyReport.SetHidden(true)
  if (forceHide === true) {
    REPORT_STATE.reportShown = false
    LoreBooksReport.SetHidden(forceHide)
  } else {
    if (ZO_LoreLibrary.IsHidden()) {
      LoreBooksReport.SetHidden(true)
      ZO_LoreLibrary.SetHidden(false)
      REPORT_STATE.reportShown = false
    } else {
      LoreBooksReport.SetHidden(false)
      ZO_LoreLibrary.SetHidden(true)
      REPORT_STATE.reportShown = true
    }
  }

  if (REPORT_STATE.loreLibraryReportKeybind !== undefined) {
    KEYBIND_STRIP.UpdateKeybindButtonGroup(REPORT_STATE.loreLibraryReportKeybind)
  }
}

export function showLoreLibraryCopyReport(): undefined {
  LoreBooksReport.SetHidden(true)

  const edit = LoreBooksCopyReport.GetNamedChild("Content")?.GetNamedChild<EditControl>("Edit")
  if (edit !== undefined) {
    edit.SelectAll()
    edit.TakeFocus()
    edit.SetTopLineIndex(1)
  }

  LoreBooksCopyReport.SetHidden(false)
}

export function isReportShown(this: void): boolean {
  return REPORT_STATE.reportShown
}

interface ShalidorCollectionReportData {
  name: string
  numKnownBooks: number
  totalBooks: number
}

function displayCollectionsReport(
  collectionsData: Record<number, ShalidorCollectionReportData>
): number {
  let yCollectionIndex = 48

  const sortable: ShalidorCollectionReportData[] = []
  for (const [, data] of pairs(collectionsData)) {
    sortable.push(data)
  }
  table.sort(sortable, (a, b) => a.totalBooks - a.numKnownBooks < b.totalBooks - b.numKnownBooks)

  let lastObject = 0
  for (const collectionIndex of $range(1, sortable.length)) {
    const data = sortable[collectionIndex - 1]
    if (data === undefined) continue

    let shalidorCollectionName = GetControl<LabelControl>(
      LoreBooksReportContainerScrollChild,
      `CollectionName${collectionIndex}`
    )
    let shalidorCollectionValue = GetControl<LabelControl>(
      LoreBooksReportContainerScrollChild,
      `CollectionValue${collectionIndex}`
    )

    if (data.numKnownBooks !== data.totalBooks) {
      if (shalidorCollectionName === undefined) {
        shalidorCollectionName = CreateControlFromVirtual<LabelControl>(
          "$(parent)CollectionName",
          LoreBooksReportContainerScrollChild,
          "Lorebook_ShaliCollectionName_Template",
          collectionIndex
        )
        shalidorCollectionValue = CreateControlFromVirtual<LabelControl>(
          "$(parent)CollectionValue",
          LoreBooksReportContainerScrollChild,
          "Lorebook_ShaliCollectionValue_Template",
          collectionIndex
        )
      }

      if (shalidorCollectionName !== undefined && shalidorCollectionValue !== undefined) {
        shalidorCollectionValue.SetAnchor(
          TOPLEFT,
          LoreBooksReportContainerScrollChild,
          TOPLEFT,
          20,
          yCollectionIndex
        )
        shalidorCollectionName.SetAnchor(
          TOPLEFT,
          LoreBooksReportContainerScrollChild,
          TOPLEFT,
          70,
          yCollectionIndex
        )

        yCollectionIndex = yCollectionIndex + 32

        shalidorCollectionName.SetText(data.name)
        shalidorCollectionValue.SetText(
          zo_strformat("<<1>>/<<2>>", data.numKnownBooks, data.totalBooks)
        )

        REPORT_STATE.copyReport = `${REPORT_STATE.copyReport}\n\n${data.name} :\n${zo_strformat(
          "<<1>>/<<2>>",
          data.numKnownBooks,
          data.totalBooks
        )}`
        lastObject = yCollectionIndex
      }
    } else if (shalidorCollectionName !== undefined && shalidorCollectionValue !== undefined) {
      shalidorCollectionName.SetHidden(true)
      shalidorCollectionValue.SetHidden(true)
    }
  }

  return lastObject + 10
}

export function buildShalidorReport(): number {
  const pointsForRankMax = 1380

  let totalKnown = 0
  let points = 0
  let booksInShalidor = 0

  const collectionsData: Record<number, ShalidorCollectionReportData> = {}
  const [, numCollections] = GetLoreCategoryInfo(LORE_LIBRARY_SHALIDOR)
  for (const collectionIndex of $range(1, numCollections)) {
    const [collectionName, , numKnownBooks, totalBooks, hidden] = loreBooksGetNewLoreCollectionInfo(
      LORE_LIBRARY_SHALIDOR,
      collectionIndex
    )
    if (!hidden) {
      totalKnown = totalKnown + numKnownBooks
      booksInShalidor = booksInShalidor + totalBooks
      points = points + numKnownBooks * 5
      collectionsData[collectionIndex] = {
        name: collectionName,
        numKnownBooks,
        totalBooks,
      }
      if (numKnownBooks === totalBooks) {
        points = points + 20
      }
    }
  }

  const shalidorHeaderText = GetControl<LabelControl>(LoreBooksReport, "ShalidorHeaderText")
  let lastObject = 52

  if (points < pointsForRankMax) {
    REPORT_STATE.copyReport = GetString(LBOOKS_RS_FEW_BOOKS_MISSING)
    shalidorHeaderText?.SetText(REPORT_STATE.copyReport)
    lastObject = displayCollectionsReport(collectionsData)
  } else if (totalKnown < booksInShalidor) {
    REPORT_STATE.copyReport = GetString(LBOOKS_RS_MDONE_BOOKS_MISSING)
    shalidorHeaderText?.SetText(REPORT_STATE.copyReport)
    lastObject = displayCollectionsReport(collectionsData)
  } else {
    REPORT_STATE.copyReport = GetString(LBOOKS_RS_GOT_ALL_BOOKS)
    shalidorHeaderText?.SetText(REPORT_STATE.copyReport)
  }

  return lastObject
}

export function buildEideticReport(lastObject: number): undefined {
  if (REPORT_STATE.eideticModeAsked === 2) {
    buildEideticReportPerCollection(lastObject)
  } else {
    buildEideticReportPerMap(lastObject)
  }
}

export function hidePreviousReport(): undefined {
  for (const childIndex of $range(1, LoreBooksReportContainerScrollChild.GetNumChildren())) {
    const childObject = LoreBooksReportContainerScrollChild.GetChild(childIndex)
    if (childObject !== undefined) {
      const childName = childObject.GetName()
      const [foundEidetic] = string.find(childName, "Eidetic")
      if (childName !== "LoreBooksReportEideticHeaderText" && foundEidetic !== undefined) {
        childObject.SetHidden(true)
      }
    }
  }
}

export function buildLoreBookSummary(): undefined {
  hidePreviousReport()

  const lastObject = buildShalidorReport()

  buildEideticReport(lastObject)

  const edit = LoreBooksCopyReport.GetNamedChild("Content")?.GetNamedChild<EditControl>("Edit")
  edit?.SetText(REPORT_STATE.copyReport)
}

export function switchLoreLibraryReportMode(this: void): undefined {
  if (REPORT_STATE.eideticModeAsked === undefined || REPORT_STATE.eideticModeAsked === 1) {
    REPORT_STATE.eideticModeAsked = 2
  } else {
    REPORT_STATE.eideticModeAsked = 1
  }

  buildLoreBookSummary()
}
