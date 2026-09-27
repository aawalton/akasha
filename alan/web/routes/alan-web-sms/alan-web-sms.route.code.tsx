import { alanwaltonWeb } from "akasha/infrastructure/service/akasha-service/web-app/pages/alanwalton-web.web-app.ts"
import { SiteDocumentDrawing } from "akasha/infrastructure/service/akasha-service/web-app/site-document/modules/drawing/site-document-drawing.module.code.tsx"
import {
  metaOf,
  SITE_DOCUMENT,
  siteDocumentAt,
} from "akasha/infrastructure/service/akasha-service/web-app/site-document/modules/reading/site-document-reading.module.code.ts"
import { namedAs } from "akasha/page/modules/address/page-address.module.code.ts"
import { useLoaderFollowing } from "akasha/page/ui/modules/loader-following/loader-following.module.code.ts"
import {
  consentWordingRead,
  SMS_CONSENT_WORDING,
} from "akasha/person/modules/sms-consent/sms-consent.module.code.ts"
import { SmsOptInForm } from "akasha/person/modules/sms-opt-in/sms-opt-in.module.code.tsx"

const WEB_APP = namedAs("web-app", alanwaltonWeb.slug, null)

const READ = [SITE_DOCUMENT, SMS_CONSENT_WORDING]

const OPT_IN = "opt-in"

const OPT_OUT = "opt-out"

const TERMS = "terms"

const PRIVACY = "privacy"

export async function loader() {
  const [document, wording, terms, privacy] = await Promise.all([
    siteDocumentAt(WEB_APP, "sms"),
    consentWordingRead(),
    siteDocumentAt(WEB_APP, TERMS),
    siteDocumentAt(WEB_APP, PRIVACY),
  ])
  return {
    document,
    wording,
    terms: { title: terms.title, href: `/${TERMS}` },
    privacy: { title: privacy.title, href: `/${PRIVACY}` },
  }
}

type SmsLoaderData = Awaited<ReturnType<typeof loader>>

export function meta({ data }: { data: SmsLoaderData | undefined }) {
  return metaOf(data?.document, null)
}

export default function SmsRoute({ loaderData }: { loaderData: SmsLoaderData }) {
  useLoaderFollowing(READ)
  const { document, wording, terms, privacy } = loaderData
  const afterward = document.sections.find((one) => one.anchor === OPT_OUT)?.lead ?? null
  const beneath = {
    [OPT_IN]: (
      <SmsOptInForm wording={wording} afterward={afterward} terms={terms} privacy={privacy} />
    ),
  }
  return <SiteDocumentDrawing document={document} beneath={beneath} />
}
