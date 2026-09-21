import {
  type PageDetailLoaderData,
  PageDetailView,
  pageDetailData,
  pageDetailMeta,
} from "akasha/alan/harness/web-page-answer/modules/page-detail-loader/page-detail-loader.module.code.tsx"

export async function loader({
  params,
}: {
  params: { pageTypeSlug: string; pageHrefParam: string }
}) {
  return pageDetailData(params)
}

export function meta({ data: loaderData }: { data: PageDetailLoaderData | undefined }) {
  return pageDetailMeta(loaderData)
}

export default function PageDetailRoute({ loaderData }: { loaderData: PageDetailLoaderData }) {
  return <PageDetailView loaderData={loaderData} />
}
