import { PageLayout } from "@akasha/design-layout/page-layout"
import { Heading } from "@akasha/design-primitives/heading"
import { Separator } from "@akasha/design-primitives/separator"
import { Text } from "@akasha/design-primitives/text-body"
import { ResourceList } from "../resource-list/resource-list.module.code.tsx"
import { SubscribeForm } from "../subscribe-form/subscribe-form.module.code.tsx"

export function meta() {
  return [{ title: "audhdalan" }]
}

export default function Home() {
  return (
    <PageLayout>
      <div className="mx-auto flex w-full max-w-4xl flex-col gap-20 px-6 pt-20 pb-16">
        <div className="flex flex-col gap-4">
          <Heading variant="subsection" as="h2" className="font-bold text-5xl text-primary">
            AuDHD Alan
          </Heading>
          <Separator className="w-24 bg-accent" />
        </div>

        <section className="flex flex-col gap-10 sm:flex-row sm:items-start">
          <div className="flex flex-1 flex-col gap-6">
            <div className="flex flex-col gap-4">
              <Heading variant="subsection" as="h2" className="font-bold text-3xl text-primary">
                About Alan
              </Heading>
              <Separator className="w-24 bg-accent" />
            </div>
            <Text variant="prose" className="text-lg">
              I've spent 20+ years building measurement systems — and most of those years in
              undiagnosed autistic burnout. Self-diagnosed AuDHD at 38, after 18 years in tech. Six
              months later I started recovery, and I'm 18 months in.
            </Text>
          </div>
          <img
            src="/autcon-2026/alan-winter.jpg"
            alt="Alan Walton"
            width={280}
            height={373}
            className="rounded-xl object-cover shadow-lg"
          />
        </section>

        <section className="flex flex-col gap-6">
          <div className="flex flex-col gap-4">
            <Heading variant="subsection" as="h2" className="font-bold text-3xl text-primary">
              Resources
            </Heading>
            <Separator className="w-24 bg-accent" />
          </div>
          <ResourceList />
        </section>

        <SubscribeForm />
      </div>
    </PageLayout>
  )
}
