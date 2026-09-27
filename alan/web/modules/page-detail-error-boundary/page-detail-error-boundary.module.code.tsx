import { useReportRenderError } from "akasha/alan/harness/errors-client/modules/use-report-render-error/use-report-render-error.module.code.ts"
import { SurfaceProvider } from "akasha/design/interface/primitive/modules/surface-provider/surface-provider.module.code.tsx"
import { usePhrase } from "akasha/infrastructure/service/akasha-service/web-app/web-phrase/modules/reading/web-phrase-reading.module.code.tsx"
import { pageDetailCouldNotLoad } from "akasha/infrastructure/service/akasha-service/web-app/web-phrase/pages/page-detail-could-not-load.web-phrase.ts"
import { pageDetailInterrupted } from "akasha/infrastructure/service/akasha-service/web-app/web-phrase/pages/page-detail-interrupted.web-phrase.ts"
import { pageDetailSometimesTemporary } from "akasha/infrastructure/service/akasha-service/web-app/web-phrase/pages/page-detail-sometimes-temporary.web-phrase.ts"
import { pageDetailTryAgain } from "akasha/infrastructure/service/akasha-service/web-app/web-phrase/pages/page-detail-try-again.web-phrase.ts"
import { pageDetailWentWrong } from "akasha/infrastructure/service/akasha-service/web-app/web-phrase/pages/page-detail-went-wrong.web-phrase.ts"
import { isRouteErrorResponse, Link, useRouteError } from "react-router"

export function PageDetailErrorBoundary() {
  const error = useRouteError()
  useReportRenderError(error, "alanwalton")
  const phrase = usePhrase()

  const isNotFound = isRouteErrorResponse(error) && error.status === 404
  const heading = phrase(isNotFound ? pageDetailCouldNotLoad.slug : pageDetailWentWrong.slug)
  const detail = phrase(isNotFound ? pageDetailSometimesTemporary.slug : pageDetailInterrupted.slug)

  return (
    <SurfaceProvider level={0} className="min-h-[50vh]">
      <main className="mx-auto flex max-w-2xl flex-col items-start gap-4 p-4 pt-16">
        <div className="flex flex-col gap-2">
          <h1 className="font-semibold text-lg">{heading}</h1>
          <p className="text-muted-foreground">{detail}</p>
        </div>
        <Link to="." replace className="underline">
          {phrase(pageDetailTryAgain.slug)}
        </Link>
      </main>
    </SurfaceProvider>
  )
}
