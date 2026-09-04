import { ApiObject, type ApiObjectProps, App, Chart } from "cdk8s"

export type ApiObjectManifest = ApiObjectProps

export function synthOne(chartId: string, id: string, manifest: ApiObjectManifest): string {
  const app = new App()
  const chart = new Chart(app, chartId)
  new ApiObject(chart, id, manifest)
  return app.synthYaml()
}

export function synthMulti(
  chartId: string,
  manifests: ReadonlyArray<{ readonly id: string; readonly manifest: ApiObjectManifest }>
): string {
  const app = new App()
  const chart = new Chart(app, chartId)
  for (const { id, manifest } of manifests) {
    new ApiObject(chart, id, manifest)
  }
  return app.synthYaml()
}
