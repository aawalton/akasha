import {
  type PageDetailLoaderData,
  PageDetailView,
  pageDetailData,
  pageDetailMeta,
} from "akasha/alan/harness/web-page-answer/modules/page-detail-loader/page-detail-loader.module.code.tsx"
import type { Route } from "./+types/archive-of-worlds-page-detail.route.code"

export async function loader({ params }: Route.LoaderArgs) {
  return pageDetailData(params)
}

export function meta({ data: loaderData }: { data: PageDetailLoaderData | undefined }) {
  return pageDetailMeta(loaderData)
}

export default function PageDetailRoute({ loaderData }: { loaderData: PageDetailLoaderData }) {
  return <PageDetailView loaderData={loaderData} />
}
