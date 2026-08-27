import { PageLayout } from "@shared/design-layout/components/page-layout"
import { Heading } from "@shared/design-primitives/components/heading"
import { Separator } from "@shared/design-primitives/components/separator"
import { Text } from "@shared/design-primitives/components/text"
import { ResourceList } from "~/components/resource-list"
import { SubscribeForm } from "~/components/subscribe-form"

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
