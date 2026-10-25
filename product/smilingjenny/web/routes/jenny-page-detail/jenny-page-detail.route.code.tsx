import { handoverReader } from "akasha/alan/harness/handover-rr/modules/handover-reader/handover-reader.module.code.ts"
import { readingFor } from "akasha/alan/harness/modules/reading-in-flight/reading-in-flight.module.code.ts"
import {
  type PageDetailLoaderData,
  PageDetailView,
  pageDetailData,
  pageDetailMeta,
} from "akasha/alan/harness/web-page-answer/modules/page-detail-loader/page-detail-loader.module.code.tsx"
import { Withheld } from "akasha/page/access/modules/read-gate/read-gate.module.code.ts"
import { JENNY_SITE } from "akasha/product/smilingjenny/web/modules/jenny-handover-site/jenny-handover-site.module.code.ts"

const READS_JENNY = handoverReader(JENNY_SITE)

export async function loader({
  params,
  request,
}: {
  params: { pageTypeSlug: string; pageHrefParam: string }
  request: Request
}) {
  try {
    return await readingFor(READS_JENNY, request, () => pageDetailData(params))
  } catch (thrown) {
    if (thrown instanceof Withheld) throw new Response("Not Found", { status: 404 })
    throw thrown
  }
}

export function meta({ data: loaderData }: { data: PageDetailLoaderData | undefined }) {
  return pageDetailMeta(loaderData)
}

export default function JennyPageDetailRoute({ loaderData }: { loaderData: PageDetailLoaderData }) {
  return <PageDetailView loaderData={loaderData} />
}
