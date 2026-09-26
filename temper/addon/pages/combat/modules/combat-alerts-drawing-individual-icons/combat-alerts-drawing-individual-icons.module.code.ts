import "akasha/temper/addon/pages/combat/modules/combat-alerts-eso-reach/combat-alerts-eso-reach.module.code.ts"
import "akasha/temper/addon/pages/combat/combat-alerts-drawing-declarations/combat-alerts-drawing-declarations.type-declaration.d.ts"
import type {
  SpaceLabelOptions,
  SpaceOptions,
  SpaceTextureOptions,
} from "akasha/temper/addon/pages/combat/modules/combat-alerts-drawing-hub/combat-alerts-drawing-hub.module.code.ts"
import "akasha/temper/addon/pages/combat/modules/combat-alerts-constants/combat-alerts-constants.module.code.ts"
import { CRUTCH } from "akasha/temper/addon/pages/combat/modules/combat-alerts-hub/combat-alerts-hub.module.code.ts"
import type { IndividualIconOptions } from "akasha/temper/addon/pages/combat/modules/combat-alerts-options/combat-alerts-options.module.code.ts"

const Draw = CRUTCH.Drawing
const C = CRUTCH.Constants

function getIconTexture(
  this: void,
  name: string,
  iconData: IndividualIconOptions
): LuaMultiReturn<
  [texture: string | undefined, left?: number, right?: number, top?: number, bottom?: number]
> {
  if (iconData.type === C.CIRCLE) {
    return $multi("TemperCombat/assets/shape/circle.dds")
  } else if (iconData.type === C.DIAMOND) {
    return $multi("TemperCombat/assets/shape/diamond.dds")
  } else if (iconData.type === C.CHEVRON) {
    return $multi("TemperCombat/assets/shape/chevron.dds")
  } else if (iconData.type === C.CHEVRON_THIN) {
    return $multi("TemperCombat/assets/shape/chevronthin.dds")
  } else if (iconData.type === C.LCI) {
    if (LibCustomIcons !== undefined) {
      return LibCustomIcons.GetStatic(name)
    }
    return $multi(undefined)
  } else if (iconData.type === C.CUSTOM) {
    return $multi(iconData.custom)
  }
  return $multi(undefined)
}

const INDIVIDUAL_ICONS_NAME = "CrutchAlertsIndividualIcon"

interface IndividualSpaceOptions extends SpaceOptions {
  texture: SpaceTextureOptions
  label: SpaceLabelOptions
}

const SPACE_OPTIONS_TABLE_POOL: Record<string, IndividualSpaceOptions> = {}

Draw.DestroyIndividualIcons = () => {
  CRUTCH.RemoveAllAttachedIcons(INDIVIDUAL_ICONS_NAME)
}

Draw.MaybeSetIndividualIcon = (unitTag) => {
  const name = GetUnitDisplayName(unitTag)
  const iconData = CRUTCH.savedOptions.drawing.attached.individualIcons[name]
  if (iconData !== undefined) {
    const spaceOptions = SPACE_OPTIONS_TABLE_POOL[name] ?? { texture: {}, label: {} }
    SPACE_OPTIONS_TABLE_POOL[name] = spaceOptions
    ZO_ClearTable(spaceOptions.texture)
    ZO_ClearTable(spaceOptions.label)

    const [texture, left, right, top, bottom] = getIconTexture(name, iconData)
    if (texture !== undefined) {
      spaceOptions.texture.path = texture
      spaceOptions.texture.size = iconData.size
      spaceOptions.texture.color = iconData.color

      spaceOptions.texture.left = left
      spaceOptions.texture.right = right
      spaceOptions.texture.top = top
      spaceOptions.texture.bottom = bottom
    }

    if (iconData.text !== undefined) {
      spaceOptions.label.text = iconData.text
      spaceOptions.label.size = iconData.textSize
      spaceOptions.label.color = iconData.textColor
    }

    CRUTCH.SetAttachedIconForUnit(
      unitTag,
      INDIVIDUAL_ICONS_NAME,
      C.PRIORITY.INDIVIDUAL_ICONS,
      undefined,
      100,
      undefined,
      true,
      undefined,
      spaceOptions
    )
  }
}

CRUTCH.AddIndividualIcon = (atName, iconType, custom, size, color, text, textSize, textColor) => {
  CRUTCH.dbgSpam("Adding individual icon for " + atName)
  const individualIcons = CRUTCH.savedOptions.drawing.attached.individualIcons
  const data: IndividualIconOptions = individualIcons[atName] ?? {
    color: [1, 1, 1, 1],
    textColor: [1, 1, 1, 1],
  }

  data.type = iconType ?? C.CIRCLE
  data.custom = custom
  data.size = size ?? 0.8
  if (color !== undefined) {
    data.color = color
  }

  data.text = text
  data.textSize = textSize ?? 40
  if (textColor !== undefined) {
    data.textColor = textColor
  }

  individualIcons[atName] = data
}

CRUTCH.RemoveIndividualIcon = (atName) => {
  delete CRUTCH.savedOptions.drawing.attached.individualIcons[atName]
}
