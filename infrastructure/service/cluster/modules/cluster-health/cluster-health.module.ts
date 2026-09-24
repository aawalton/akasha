import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const clusterHealth = {
  id: "01a0d4b8-2af2-7ed7-80e8-d844871855f7",
  type: "page-type/module",
  slug: "cluster-health",
  definition: "whether the workload each cluster service is runs as its page states",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Every cluster service page is watched.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The cluster is asked once for every workload, job, replica set and pod it holds.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The cluster is reached with kubectl, as a deploy reaches it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A cluster that will not answer is no health rather than every service broken.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A service whose resource the cluster does not hold is broken.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A service with a pod crash-looping is broken, whatever its kind.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A crash-looping pod is broken though its rollout is still settling.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A pod that has ended is not judged.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A deployment or stateful set with fewer replicas ready than its page states is broken.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A page stating no replicas is held to the replicas the resource itself asks for.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A rollout still in progress is settling rather than broken.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A rollout that passed its progress deadline is broken.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A daemon set with fewer pods ready than it scheduled is broken.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A cron job whose last run to end failed is broken.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A cron job that has not run since the last run its schedule named is broken.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A run is missed only two minutes after that run was due.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A cron job made after the run last due has missed nothing.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A cron job is judged by the schedule its page states, or else by its own.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A service whose pod template runs no container of the image its page states is broken.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A live pod running no container of that image is broken, unless its rollout is settling.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An image stated with no tag is run under whatever tag or digest.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A service reads as broken with the counts and names the cluster gave.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here writes a verdict or changes the cluster.",
    },
  ],
} as const satisfies Module
