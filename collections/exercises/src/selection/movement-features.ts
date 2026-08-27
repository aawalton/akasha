import type { Page } from "../pages/page"
import { fieldBool, fieldNum, fieldStr, fieldStrList } from "../cli/lib/fields"
import type { MovementFeatures } from "./scorer"

export function movementFeaturesFromPage(page: Page): MovementFeatures {
  return {
    movementPattern: fieldStr(page, "movementPattern"),
    secondaryPattern: fieldStr(page, "secondaryPattern"),
    laterality: fieldStr(page, "laterality"),
    isBallistic: fieldBool(page, "isBallistic"),
    skillCost: fieldStr(page, "skillCost"),
    trainsLengthenedRange: fieldBool(page, "trainsLengthenedRange"),
    gripDemand: fieldStr(page, "gripDemand"),
    sfrScore: fieldNum(page, "sfrScore"),
    category: fieldStr(page, "category"),
    mechanic: fieldStr(page, "mechanic"),
    primaryMuscles: fieldStrList(page, "primaryMuscles"),
    secondaryMuscles: fieldStrList(page, "secondaryMuscles"),
  }
}
