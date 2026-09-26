import "akasha/temper/addon/pages/combat/modules/combat-alerts-eso-reach/combat-alerts-eso-reach.module.code.ts"
import { WORLD_ICON_DATA } from "akasha/temper/addon/pages/combat/combat-alerts-drawing/modules/world-icons-data/combat-alerts-drawing-world-icons-data.module.code.ts"
import { WORLD_ICON_GROUPS_A } from "akasha/temper/addon/pages/combat/combat-alerts-drawing/modules/world-icons-groups-a/combat-alerts-drawing-world-icons-groups-a.module.code.ts"
import { WORLD_ICON_GROUPS_B } from "akasha/temper/addon/pages/combat/combat-alerts-drawing/modules/world-icons-groups-b/combat-alerts-drawing-world-icons-groups-b.module.code.ts"
import type { WorldIconGroup } from "akasha/temper/addon/pages/combat/combat-alerts-drawing/modules/world-icons-sizes/combat-alerts-drawing-world-icons-sizes.module.code.ts"
import type {
  DrawingKey,
  DrawingOrientation,
  SpaceOptions,
} from "akasha/temper/addon/pages/combat/modules/combat-alerts-drawing-hub/combat-alerts-drawing-hub.module.code.ts"
import "akasha/temper/addon/pages/combat/modules/combat-alerts-constants/combat-alerts-constants.module.code.ts"
import { CRUTCH } from "akasha/temper/addon/pages/combat/modules/combat-alerts-hub/combat-alerts-hub.module.code.ts"

const C = CRUTCH.Constants

const ICONS: Record<string, DrawingKey> = {}

function getIconGroup(this: void, iconGroupName: string): WorldIconGroup | undefined {
  return WORLD_ICON_GROUPS_A[iconGroupName] ?? WORLD_ICON_GROUPS_B[iconGroupName]
}

CRUTCH.EnableIcon = (name) => {
  if (ICONS[name] !== undefined) {
    CRUTCH.dbgOther("|cFF0000Icon already enabled " + name + "|r")
    return
  }

  const iconData = WORLD_ICON_DATA[name]
  if (iconData === undefined) {
    CRUTCH.dbgOther("|cFF0000Invalid icon name " + name + "|r")
    return
  }

  const size = iconData.size() / 1.5
  const key = CRUTCH.Drawing.CreatePlacedPositionMarker(
    iconData.texture,
    iconData.x,
    iconData.y,
    iconData.z,
    size
  )
  ICONS[name] = key
}

CRUTCH.DisableIcon = (name) => {
  const key = ICONS[name]
  if (key === undefined) {
    return
  }

  CRUTCH.Drawing.RemovePlacedPositionMarker(key)
  delete ICONS[name]
}

CRUTCH.EnableIconGroup = (iconGroupName) => {
  const iconGroup = getIconGroup(iconGroupName)
  if (iconGroup === undefined) {
    CRUTCH.dbgOther("|cFF0000Invalid icon group name " + iconGroupName + "|r")
    return
  }

  const size = iconGroup.size() / 1.5
  for (let i = 1; i <= iconGroup.icons.length; i++) {
    const iconData = iconGroup.icons[i - 1]
    if (iconData === undefined) {
      continue
    }
    const name = iconGroupName + "_" + tostring(i)

    if (ICONS[name] !== undefined) {
      CRUTCH.dbgOther("|cFF0000Icon already enabled " + name + "|r")
    } else {
      let key: DrawingKey
      if (iconData.text !== undefined) {
        const placed = CRUTCH.savedOptions.drawing.placedPositioning
        const options: SpaceOptions = {}
        if (iconData.texture !== undefined) {
          const color = iconData.color as readonly number[]
          options.texture = {
            path: iconData.texture,
            size: size / 100,
            color: [color[0] as number, color[1] as number, color[2] as number, placed.opacity],
          }
        }

        options.label = {
          text: iconData.text,
          size: size * 0.5,
          color: [1, 1, 1, placed.opacity],
        }

        let faceCamera: boolean
        let orientation: DrawingOrientation | undefined
        let y = iconData.y
        if (iconData.orientation !== undefined) {
          faceCamera = false
          orientation = iconData.orientation
        } else if (iconData.faceCamera === true) {
          faceCamera = true
          orientation = undefined
          y = y + size / 2
        } else if (placed.flat) {
          faceCamera = false
          orientation = C.FLAT_ORIENTATION
        } else {
          faceCamera = true
          orientation = undefined
          y = y + size / 2
        }

        key = CRUTCH.Drawing.CreateSpaceControl(
          iconData.x,
          y,
          iconData.z,
          faceCamera,
          orientation,
          options,
          undefined
        )
      } else {
        key = CRUTCH.Drawing.CreatePlacedPositionMarker(
          iconData.texture as string,
          iconData.x,
          iconData.y,
          iconData.z,
          size
        )
      }
      ICONS[name] = key
    }
  }
}

CRUTCH.DisableIconGroup = (iconGroupName) => {
  const iconGroup = getIconGroup(iconGroupName)
  if (iconGroup === undefined) {
    CRUTCH.dbgOther("|cFF0000Invalid icon group name " + iconGroupName + "|r")
    return
  }

  iconGroup.size()
  for (let i = 1; i <= iconGroup.icons.length; i++) {
    const name = iconGroupName + "_" + tostring(i)
    const key = ICONS[name]
    if (key !== undefined) {
      CRUTCH.Drawing.RemovePlacedPositionMarker(key)
      delete ICONS[name]
    }
  }
}
