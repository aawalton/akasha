import type { SlidePointColor } from "akasha/infrastructure/service/akasha-service/web-app/site-document/slide/properties/slide-point-color.select-property.types.ts"
import type { SlidePointFill } from "akasha/infrastructure/service/akasha-service/web-app/site-document/slide/properties/slide-point-fill.number-property.types.ts"
import type { SlidePointIcon } from "akasha/infrastructure/service/akasha-service/web-app/site-document/slide/properties/slide-point-icon.select-property.types.ts"
import type { SlidePointValue } from "akasha/infrastructure/service/akasha-service/web-app/site-document/slide/properties/slide-point-value.text-property.types.ts"
import type { Description } from "akasha/page/properties/description.text-property.types.ts"
import type { Title } from "akasha/page/properties/title.text-property.types.ts"
import type { List } from "akasha/page/type/page-property/page-property.page-type.ts"

export type SlidePoints = List<{
  title: Title
  value?: SlidePointValue
  description?: Description
  color?: SlidePointColor
  fill?: SlidePointFill
  icon?: SlidePointIcon
}>
