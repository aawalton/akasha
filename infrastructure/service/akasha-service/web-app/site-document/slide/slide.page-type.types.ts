import type { SiteDocumentLead } from "akasha/infrastructure/service/akasha-service/web-app/site-document/properties/site-document-lead.text-property.types.ts"
import type { SlideCloser } from "akasha/infrastructure/service/akasha-service/web-app/site-document/slide/properties/slide-closer.text-property.types.ts"
import type { SlideDeck } from "akasha/infrastructure/service/akasha-service/web-app/site-document/slide/properties/slide-deck.relation-property.types.ts"
import type { SlideImage } from "akasha/infrastructure/service/akasha-service/web-app/site-document/slide/properties/slide-image.text-property.types.ts"
import type { SlideImageCaption } from "akasha/infrastructure/service/akasha-service/web-app/site-document/slide/properties/slide-image-caption.text-property.types.ts"
import type { SlideKind } from "akasha/infrastructure/service/akasha-service/web-app/site-document/slide/properties/slide-kind.select-property.types.ts"
import type { SlideNumber } from "akasha/infrastructure/service/akasha-service/web-app/site-document/slide/properties/slide-number.number-property.types.ts"
import type { SlidePoints } from "akasha/infrastructure/service/akasha-service/web-app/site-document/slide/properties/slide-points.record-property.types.ts"
import type { Page } from "akasha/page/page.page-type.types.ts"

export type Slide = Page & {
  deck: SlideDeck
  number: SlideNumber
  kind: SlideKind
  lead?: SiteDocumentLead
  points?: SlidePoints
  closer?: SlideCloser
  image?: SlideImage
  imageCaption?: SlideImageCaption
}
